#!/usr/bin/env node

/**
 * Bulk Media Deletion Script for SunnySide Tours
 * Deletes:
 * 1. All Gallery images (/api/Gallery/DeleteImage/{id})
 * 2. All Trip images across all trips (/api/Trips/{tripId}/image/{imageId})
 * 3. All Trip Types (/api/TripTypes/{id})
 *
 * Usage:
 *   node scripts/bulk-delete-media.mjs [options]
 *   npm run clean:media -- [options]
 *
 * Options:
 *   --dry-run             List all items that would be deleted without actually deleting
 *   --gallery-only        Only delete gallery images
 *   --trips-only          Only delete trip images
 *   --trip-types-only     Only delete trip types
 *   --email <email>       Admin email for login
 *   --password <password> Admin password for login
 *   --token <token>       Direct Bearer token (skip login)
 *   --yes, -y             Skip confirmation prompt
 */

import readline from "node:readline";

const API_BASE_URL = "https://hurghadsfariback.premiumasp.net";

// Command line argument parser
const args = process.argv.slice(2);
function getArg(flag) {
  const index = args.indexOf(flag);
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1];
  }
  return null;
}
const hasFlag = (flag) => args.includes(flag);

const isDryRun = hasFlag("--dry-run");
const autoConfirm = hasFlag("--yes") || hasFlag("-y");
const galleryOnly = hasFlag("--gallery-only");
const tripsOnly = hasFlag("--trips-only");
const tripTypesOnly = hasFlag("--trip-types-only");

const shouldDeleteGallery = galleryOnly || (!tripsOnly && !tripTypesOnly);
const shouldDeleteTrips = tripsOnly || (!galleryOnly && !tripTypesOnly);
const shouldDeleteTripTypes = tripTypesOnly || (!galleryOnly && !tripsOnly);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getAuthToken() {
  let token = getArg("--token") || process.env.ADMIN_TOKEN;
  if (token) return token;

  let email = getArg("--email") || process.env.ADMIN_EMAIL;
  let password = getArg("--password") || process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log("\n========================================");
    console.log("   Admin Authentication Required");
    console.log("========================================");
    console.log("Enter your credentials or provide a Bearer token.\n");

    const authMethod = await askQuestion(
      "Login with Email/Password (1) or Paste Bearer Token (2)? [1/2]: "
    );

    if (authMethod.trim() === "2") {
      token = (await askQuestion("Enter Bearer Token: ")).trim();
      if (!token) throw new Error("Token cannot be empty.");
      return token;
    }

    if (!email) {
      email = (await askQuestion("Admin Email: ")).trim();
    }
    if (!password) {
      password = (await askQuestion("Admin Password: ")).trim();
    }
  }

  console.log(`\nLogging in as ${email}...`);
  const response = await fetch(`${API_BASE_URL}/api/Auth/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.data?.accessToken) {
    const errorMsg =
      data?.message || data?.detail || `HTTP ${response.status} ${response.statusText}`;
    throw new Error(`Login failed: ${errorMsg}`);
  }

  console.log("✓ Login successful!");
  return data.data.accessToken;
}

async function apiRequest(path, options = {}, token = null) {
  const headers = {
    Accept: "application/json, text/plain, */*",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = text;
  }

  return { ok: response.ok, status: response.status, data: json };
}

async function fetchGalleryImages() {
  const res = await apiRequest("/api/Gallery/GetAllImages");
  if (!res.ok) {
    throw new Error(`Failed to fetch gallery images: HTTP ${res.status}`);
  }
  return res.data?.data || [];
}

async function fetchAllTrips() {
  const trips = [];
  let page = 1;
  const pageSize = 50;

  while (true) {
    const res = await apiRequest(
      `/api/Trips?PageNumber=${page}&PageSize=${pageSize}&IncludeInactive=true`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch trips (page ${page}): HTTP ${res.status}`);
    }

    const items = res.data?.data || [];
    if (items.length === 0) break;
    trips.push(...items);
    if (items.length < pageSize) break;
    page++;
  }

  return trips;
}

async function fetchAllTripTypes() {
  const tripTypes = [];
  let page = 1;
  const pageSize = 50;

  while (true) {
    const res = await apiRequest(
      `/api/TripTypes?PageNumber=${page}&PageSize=${pageSize}`
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch trip types (page ${page}): HTTP ${res.status}`
      );
    }

    const items = res.data?.data || [];
    if (items.length === 0) break;
    tripTypes.push(...items);
    if (items.length < pageSize) break;
    page++;
  }

  return tripTypes;
}

async function main() {
  console.log("=================================================");
  console.log("       SunnySide Tours - Bulk Media Deletion     ");
  console.log("=================================================");
  if (isDryRun) {
    console.log("🔍 DRY RUN MODE ACTIVATED - No items will be deleted.\n");
  }

  console.log("Scope configured:");
  console.log(` - Gallery images:  ${shouldDeleteGallery ? "YES" : "NO"}`);
  console.log(` - Trip images:     ${shouldDeleteTrips ? "YES" : "NO"}`);
  console.log(` - Trip types:      ${shouldDeleteTripTypes ? "YES" : "NO"}`);
  console.log();

  // 1. Fetch current items
  console.log("Fetching current items from server...");
  let galleryImages = [];
  let trips = [];
  let tripTypes = [];

  if (shouldDeleteGallery) {
    galleryImages = await fetchGalleryImages();
    console.log(`Found ${galleryImages.length} gallery images.`);
  }

  if (shouldDeleteTrips) {
    trips = await fetchAllTrips();
    const totalTripImages = trips.reduce(
      (acc, trip) => acc + (trip.images?.length || 0),
      0
    );
    console.log(
      `Found ${trips.length} trips containing ${totalTripImages} total images.`
    );
  }

  if (shouldDeleteTripTypes) {
    tripTypes = await fetchAllTripTypes();
    console.log(`Found ${tripTypes.length} trip types.`);
  }

  const totalTripImages = trips.reduce(
    (acc, trip) => acc + (trip.images?.length || 0),
    0
  );
  const totalItemsCount =
    (shouldDeleteGallery ? galleryImages.length : 0) +
    (shouldDeleteTrips ? totalTripImages : 0) +
    (shouldDeleteTripTypes ? tripTypes.length : 0);

  console.log(`\nTotal items to process: ${totalItemsCount}`);

  if (totalItemsCount === 0) {
    console.log("\nNothing to delete. Exiting.");
    rl.close();
    return;
  }

  if (isDryRun) {
    console.log("\n[DRY RUN SUMMARY]");
    if (shouldDeleteGallery) {
      console.log(`\nGallery Images (${galleryImages.length}):`);
      galleryImages.forEach((img) =>
        console.log(`  - ID ${img.id}: ${img.imageUrl}`)
      );
    }
    if (shouldDeleteTrips) {
      console.log(`\nTrips Images (${totalTripImages}):`);
      trips.forEach((trip) => {
        if (trip.images && trip.images.length > 0) {
          console.log(`  Trip '${trip.name}' (ID ${trip.id}):`);
          trip.images.forEach((img) =>
            console.log(`    - Image ID ${img.id}: ${img.imageUrl}`)
          );
        }
      });
    }
    if (shouldDeleteTripTypes) {
      console.log(`\nTrip Types (${tripTypes.length}):`);
      tripTypes.forEach((tt) =>
        console.log(`  - ID ${tt.id}: '${tt.name}' (${tt.imageUrl || "No Image"})`)
      );
    }
    console.log("\nDry run completed. No items were deleted.");
    rl.close();
    return;
  }

  // 2. Obtain Authentication Token
  const token = await getAuthToken();

  // 3. Confirm Deletion
  if (!autoConfirm) {
    console.log("\n⚠️  WARNING: You are about to permanently delete:");
    if (shouldDeleteGallery)
      console.log(`  • ${galleryImages.length} gallery images`);
    if (shouldDeleteTrips)
      console.log(
        `  • ${totalTripImages} trip images across ${trips.length} trips`
      );
    if (shouldDeleteTripTypes)
      console.log(`  • ${tripTypes.length} trip types`);
    console.log();

    const confirmation = await askQuestion(
      "Type 'DELETE' to confirm and start deletion: "
    );
    if (confirmation.trim() !== "DELETE") {
      console.log("Operation aborted by user.");
      rl.close();
      return;
    }
  }

  console.log("\nStarting deletion process...\n");
  const stats = {
    galleryDeleted: 0,
    galleryFailed: 0,
    tripImagesDeleted: 0,
    tripImagesFailed: 0,
    tripTypesDeleted: 0,
    tripTypesFailed: 0,
  };

  // Delete Gallery Images
  if (shouldDeleteGallery && galleryImages.length > 0) {
    console.log("--- Deleting Gallery Images ---");
    let current = 0;
    for (const img of galleryImages) {
      current++;
      try {
        const res = await apiRequest(
          `/api/Gallery/DeleteImage/${img.id}`,
          { method: "DELETE" },
          token
        );
        if (res.ok) {
          stats.galleryDeleted++;
          console.log(
            `[Gallery ${current}/${galleryImages.length}] ✓ Deleted ID ${img.id}`
          );
        } else {
          stats.galleryFailed++;
          console.error(
            `[Gallery ${current}/${galleryImages.length}] ✗ Failed ID ${img.id}: HTTP ${res.status}`
          );
        }
      } catch (err) {
        stats.galleryFailed++;
        console.error(
          `[Gallery ${current}/${galleryImages.length}] ✗ Error ID ${img.id}:`,
          err.message
        );
      }
      await sleep(50);
    }
    console.log();
  }

  // Delete Trip Images
  if (shouldDeleteTrips && totalTripImages > 0) {
    console.log("--- Deleting Trip Images ---");
    let current = 0;
    for (const trip of trips) {
      if (!trip.images || trip.images.length === 0) continue;
      for (const img of trip.images) {
        current++;
        try {
          const res = await apiRequest(
            `/api/Trips/${trip.id}/image/${img.id}`,
            { method: "DELETE" },
            token
          );
          if (res.ok) {
            stats.tripImagesDeleted++;
            console.log(
              `[Trip Image ${current}/${totalTripImages}] ✓ Deleted Image ID ${img.id} from Trip '${trip.name}'`
            );
          } else {
            stats.tripImagesFailed++;
            console.error(
              `[Trip Image ${current}/${totalTripImages}] ✗ Failed Image ID ${img.id} (Trip ${trip.id}): HTTP ${res.status}`
            );
          }
        } catch (err) {
          stats.tripImagesFailed++;
          console.error(
            `[Trip Image ${current}/${totalTripImages}] ✗ Error Image ID ${img.id}:`,
            err.message
          );
        }
        await sleep(50);
      }
    }
    console.log();
  }

  // Delete Trip Types
  if (shouldDeleteTripTypes && tripTypes.length > 0) {
    console.log("--- Deleting Trip Types ---");
    let current = 0;
    for (const tt of tripTypes) {
      current++;
      try {
        const res = await apiRequest(
          `/api/TripTypes/${tt.id}`,
          { method: "DELETE" },
          token
        );
        if (res.ok) {
          stats.tripTypesDeleted++;
          console.log(
            `[Trip Type ${current}/${tripTypes.length}] ✓ Deleted '${tt.name}' (ID ${tt.id})`
          );
        } else {
          stats.tripTypesFailed++;
          console.error(
            `[Trip Type ${current}/${tripTypes.length}] ✗ Failed ID ${tt.id}: HTTP ${res.status}`
          );
        }
      } catch (err) {
        stats.tripTypesFailed++;
        console.error(
          `[Trip Type ${current}/${tripTypes.length}] ✗ Error ID ${tt.id}:`,
          err.message
        );
      }
      await sleep(50);
    }
    console.log();
  }

  console.log("=================================================");
  console.log("               Deletion Complete                 ");
  console.log("=================================================");
  console.log(
    `Gallery images:  ${stats.galleryDeleted} deleted, ${stats.galleryFailed} failed`
  );
  console.log(
    `Trip images:     ${stats.tripImagesDeleted} deleted, ${stats.tripImagesFailed} failed`
  );
  console.log(
    `Trip types:      ${stats.tripTypesDeleted} deleted, ${stats.tripTypesFailed} failed`
  );
  console.log("=================================================\n");

  rl.close();
}

main().catch((err) => {
  console.error("\n❌ Fatal Error:", err.message);
  rl.close();
  process.exit(1);
});


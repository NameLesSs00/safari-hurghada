#!/usr/bin/env node
/**
 * upload-trips.mjs
 *
 * Uploads trips to the Safari Hurghada backend in batches of 3.
 *
 * Usage:
 *   node scripts/upload-trips.mjs --batch=1
 *   node scripts/upload-trips.mjs --batch=2
 *   node scripts/upload-trips.mjs --slug=moto_safari
 *   node scripts/upload-trips.mjs --status
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TRIPS_DIR = path.join(ROOT, "dataEntry", "trips");

const API_BASE = "https://hurghadsfariback.premiumasp.net";
const REFRESH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwMjIxMDEzMTEiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTAzMTE0MH0.BXBzNcd3MpMJQf9nK7oKlh2BbzykNSqiJaewer_EU9Q";

const BATCHES = {
  1: ["moto_safari", "super_desert_safari", "horse-riding-on-the-beach"],
  2: ["orange-bay", "paradise-island", "hula-hula-island-trip"],
  3: ["adventour-submarine", "alpha-sea-trip", "sub-marine"],
  4: ["dolphin-house", "dolphin_show", "parasailing"],
  5: ["scuba-diving", "cairo", "luxor_country"],
};

async function getAccessToken() {
  const res = await fetch(`${API_BASE}/api/Auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: REFRESH_TOKEN }),
  });
  if (!res.ok) {
    throw new Error(`Auth refresh failed with status ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  const token = json?.data?.accesstoken || json?.data?.accessToken;
  if (!token) throw new Error("No access token in refresh response");
  return token;
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  return "application/octet-stream";
}

async function uploadTrip(slug, token) {
  const tripDir = path.join(TRIPS_DIR, slug);
  const jsonPath = path.join(tripDir, "trip.json");
  const trip = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

  if (trip.backendId) {
    console.log(`ℹ️ [${slug}] already uploaded with ID: ${trip.backendId}. Skipping creation.`);
    return trip.backendId;
  }

  console.log(`\n========================================`);
  console.log(`🚀 Uploading trip: ${slug} (${trip.name.en})`);
  console.log(`========================================`);

  // Step 1: Create Trip record
  const payload = {
    destinationId: trip.destinationId,
    name: trip.name,
    description: trip.description,
    timeFrom: trip.timeFrom,
    durationValue: trip.durationValue,
    durationType: trip.durationType,
    adultPrice: trip.adultPrice,
    childPrice: trip.childPrice,
    tripTypeId: trip.tripTypeId,
    highlights: trip.highlights,
    includes: trip.includes,
    excludes: trip.excludes,
    whatToBring: trip.whatToBring,
    availabilityDayNo: trip.availabilityDayNo,
  };

  const createRes = await fetch(`${API_BASE}/api/Trips`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const createText = await createRes.text();
  let createJson;
  try {
    createJson = JSON.parse(createText);
  } catch {
    throw new Error(`Failed to parse create response: ${createText}`);
  }

  if (!createRes.ok || !createJson.success) {
    throw new Error(`Failed to create trip ${slug}: ${createText}`);
  }

  const createdTrip = createJson.data;
  const tripId = createdTrip.id;
  console.log(`✓ Trip created successfully with ID: ${tripId}`);

  // Step 2: Upload Images
  const imagesDir = path.join(tripDir, "images");
  if (fs.existsSync(imagesDir)) {
    const files = fs
      .readdirSync(imagesDir)
      .filter((f) => !f.startsWith("."))
      .sort();

    if (files.length > 0) {
      console.log(`Uploading ${files.length} images for trip ${tripId}...`);
      const formData = new FormData();

      for (const file of files) {
        const filePath = path.join(imagesDir, file);
        const buffer = fs.readFileSync(filePath);
        const blob = new Blob([buffer], { type: getMimeType(filePath) });
        formData.append("Images", blob, file);
      }

      const imgRes = await fetch(`${API_BASE}/api/Trips/${tripId}/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const imgText = await imgRes.text();
      let imgJson;
      try {
        imgJson = JSON.parse(imgText);
      } catch {
        console.warn(`Warning: failed to parse image upload response: ${imgText}`);
      }

      if (imgRes.ok && imgJson?.success) {
        const uploadedImages = imgJson.data || [];
        console.log(`✓ Successfully uploaded ${uploadedImages.length} images.`);

        // Step 3: Set primary image if we have uploaded images
        if (uploadedImages.length > 0) {
          const primaryImageId = uploadedImages[0].id;
          console.log(`Setting image ${primaryImageId} as primary...`);

          const primRes = await fetch(
            `${API_BASE}/api/Trips/${tripId}/image/${primaryImageId}/set-primary`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            }
          );
          if (primRes.ok) {
            console.log(`✓ Primary image set.`);
          } else {
            console.warn(`Warning: setting primary image returned status ${primRes.status}`);
          }
        }
      } else {
        console.warn(`Image upload warning for trip ${tripId}: ${imgText}`);
      }
    }
  }

  // Update local trip.json with backend ID
  trip.backendId = tripId;
  trip.uploadedAt = new Date().toISOString();
  fs.writeFileSync(jsonPath, JSON.stringify(trip, null, 2) + "\n", "utf8");
  console.log(`✓ Saved backendId ${tripId} in local trip.json`);

  return tripId;
}

async function printStatus() {
  console.log("\n--- Safari Hurghada Trips Status ---");
  for (let b = 1; b <= 5; b++) {
    console.log(`\n[Batch ${b}]`);
    for (const slug of BATCHES[b]) {
      const tripPath = path.join(TRIPS_DIR, slug, "trip.json");
      if (fs.existsSync(tripPath)) {
        const t = JSON.parse(fs.readFileSync(tripPath, "utf8"));
        const status = t.backendId ? `✅ Uploaded (ID: ${t.backendId})` : "⏳ Pending";
        console.log(`  - ${slug.padEnd(28)}: ${status} | €${t.adultPrice} / €${t.childPrice}`);
      }
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const batchArg = args.find((a) => a.startsWith("--batch="));
  const slugArg = args.find((a) => a.startsWith("--slug="));
  const statusArg = args.includes("--status");

  if (statusArg || args.length === 0) {
    await printStatus();
    return;
  }

  const token = await getAccessToken();
  console.log("✓ Authenticated with backend API.");

  let slugsToUpload = [];

  if (batchArg) {
    const batchNum = parseInt(batchArg.split("=")[1], 10);
    slugsToUpload = BATCHES[batchNum];
    if (!slugsToUpload) {
      console.error(`Invalid batch number: ${batchNum}. Valid batches are 1 to 5.`);
      process.exit(1);
    }
    console.log(`Starting Batch ${batchNum} (${slugsToUpload.join(", ")})...`);
  } else if (slugArg) {
    const slug = slugArg.split("=")[1];
    slugsToUpload = [slug];
  }

  for (const slug of slugsToUpload) {
    try {
      await uploadTrip(slug, token);
    } catch (err) {
      console.error(`❌ Error uploading ${slug}:`, err.message);
      process.exit(1);
    }
  }

  console.log("\n🎉 Batch processing finished successfully!");
  await printStatus();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});


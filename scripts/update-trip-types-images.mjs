#!/usr/bin/env node
/**
 * update-trip-types-images.mjs
 *
 * Updates each Trip Type in the Safari Hurghada backend with a relevant,
 * high-resolution image chosen from our curated trip image collection.
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

const TRIP_TYPES_CONFIG = [
  {
    id: 5,
    name: "Safari excursions",
    imageRelPath: "moto_safari/images/01.jpeg",
    reason: "Quad bike ATV cruising through golden desert dunes"
  },
  {
    id: 4,
    name: "Snorkelling",
    imageRelPath: "orange-bay/images/01.jpeg",
    reason: "Crystal clear turquoise water and iconic Giftun Island beach"
  },
  {
    id: 10,
    name: "diving ",
    imageRelPath: "scuba-diving/images/01.jpeg",
    reason: "Scuba diver exploring coral reef with exotic marine fish"
  },
  {
    id: 9,
    name: "Horse riding ",
    imageRelPath: "horse-riding-on-the-beach/images/01.jpg",
    reason: "Majestic Arabian horse along the Red Sea shoreline"
  },
  {
    id: 6,
    name: "Culture excursions",
    imageRelPath: "cairo/images/01.jpg",
    reason: "The Great Pyramids of Giza ancient wonder"
  },
  {
    id: 12,
    name: "Water Sports",
    imageRelPath: "parasailing/images/01.jpg",
    reason: "Parasailing flight high over the Red Sea"
  },
  {
    id: 11,
    name: "Activities ",
    imageRelPath: "dolphin_show/images/01.jpg",
    reason: "Acrobatic dolphin show performance at Dolphin World"
  },
  {
    id: 7,
    name: "Spa & massage ",
    imageRelPath: "paradise-island/images/01.jpg",
    reason: "Serene tropical beach relaxation and luxury lounge setting"
  },
  {
    id: 8,
    name: "Transfer",
    imageRelPath: "super_desert_safari/images/05.jpeg",
    reason: "Desert transfer vehicle traversing rugged desert terrain"
  }
];

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

async function updateTripType(tt, token) {
  const imageAbsPath = path.join(TRIPS_DIR, tt.imageRelPath);
  if (!fs.existsSync(imageAbsPath)) {
    throw new Error(`Image file not found: ${imageAbsPath}`);
  }

  const fileName = path.basename(imageAbsPath);
  const buffer = fs.readFileSync(imageAbsPath);
  const blob = new Blob([buffer], { type: getMimeType(imageAbsPath) });

  const formData = new FormData();
  formData.append("Id", String(tt.id));
  formData.append("Name.En", tt.name);
  formData.append("Name.Fr", tt.name);
  formData.append("Name.Ru", tt.name);
  formData.append("Name.Ro", tt.name);
  formData.append("Image", blob, fileName);

  console.log(`\nUpdating Trip Type [ID: ${tt.id}] "${tt.name}" with ${tt.imageRelPath}...`);
  console.log(`Context: ${tt.reason}`);

  const res = await fetch(`${API_BASE}/api/TripTypes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Failed to parse response: ${text}`);
  }

  if (!res.ok || !json.success) {
    throw new Error(`Failed to update Trip Type ${tt.id}: ${text}`);
  }

  console.log(`✓ Updated successfully! New image: ${json.data.imageUrl}`);
  return json.data;
}

async function main() {
  console.log("Starting Trip Types image update process...");
  const token = await getAccessToken();
  console.log("✓ Authenticated with backend API.");

  const results = [];
  for (const tt of TRIP_TYPES_CONFIG) {
    try {
      const updated = await updateTripType(tt, token);
      results.push(updated);
    } catch (err) {
      console.error(`❌ Error updating ${tt.name}:`, err.message);
    }
  }

  console.log(`\n🎉 Finished updating ${results.length}/${TRIP_TYPES_CONFIG.length} Trip Types!`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});


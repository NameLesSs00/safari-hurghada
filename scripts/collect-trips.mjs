#!/usr/bin/env node
/**
 * collect-trips.mjs
 *
 * Collects every trip (WooCommerce product) and its full-resolution images from
 * the live site into the local `dataEntry/` tree, shaped for later import into
 * the Safari Hurghada backend.
 *
 * Source of truth: the public WooCommerce Store API (clean JSON, no auth).
 *   https://safarihurghada.net/wp-json/wc/store/v1/products?per_page=100
 *
 * Dependency-free: uses only Node built-ins + global fetch (Node 18+), with an
 * `https` fallback. Never shells out to wget/curl.
 *
 * Run: node scripts/collect-trips.mjs   (or: bun run collect:trips)
 *
 * Idempotent: re-running refreshes `raw/`, `reference/`, `catalog.json` and any
 * missing images, but NEVER overwrites an existing (possibly hand-curated)
 * `trips/<slug>/trip.json`.
 */

import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "dataEntry");
const RAW_DIR = path.join(DATA_DIR, "raw");
const REF_DIR = path.join(DATA_DIR, "reference");
const TRIPS_DIR = path.join(DATA_DIR, "trips");

const STORE_API =
  "https://safarihurghada.net/wp-json/wc/store/v1/products?per_page=100";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
// The site hotlink-protects wp-content uploads; a same-origin Referer is required.
const REFERER = "https://safarihurghada.net/";

/* ------------------------------------------------------------------ */
/* Curated taxonomy (the WooCommerce category is a single generic      */
/* "All Tours & Trips", so trip types + destinations are assigned here) */
/* ------------------------------------------------------------------ */

const DESTINATIONS = [
  { name: "Hurghada", provisionalId: 2 },
  { name: "Giza", provisionalId: 3 },
  { name: "Aswan", provisionalId: 4 },
  { name: "Cairo", provisionalId: 5 },
  { name: "Luxor", provisionalId: 6 },
  { name: "El Gouna", provisionalId: 7 },
];

const TRIP_TYPES = [
  {
    provisionalId: 1,
    name: "Desert Safari",
    slugs: ["moto_safari", "super_desert_safari"],
  },
  {
    provisionalId: 2,
    name: "Sea & Islands",
    slugs: [
      "hula-hula-island-trip",
      "alpha-sea-trip",
      "orange-bay",
      "paradise-island",
      "adventour-submarine",
    ],
  },
  {
    provisionalId: 3,
    name: "Diving & Snorkeling",
    slugs: ["scuba-diving", "sub-marine"],
  },
  { provisionalId: 4, name: "Water Sports", slugs: ["parasailing"] },
  {
    provisionalId: 5,
    name: "Marine Life",
    slugs: ["dolphin-house", "dolphin_show"],
  },
  {
    provisionalId: 6,
    name: "Beach Activities",
    slugs: ["horse-riding-on-the-beach"],
  },
  { provisionalId: 7, name: "City & Culture", slugs: ["cairo", "luxor_country"] },
];

// Most trips depart from Hurghada; only these are elsewhere.
const DESTINATION_BY_SLUG = {
  cairo: "Cairo",
  luxor_country: "Luxor",
};

// Clean display titles (the WooCommerce names are long SEO strings).
// The original name is preserved in each trip.json under `_source.originalName`.
const NAME_BY_SLUG = {
  "hula-hula-island-trip": "Hula Hula Island Trip",
  "adventour-submarine": "Adventour Submarine & Magawish Island Cruise",
  "horse-riding-on-the-beach": "Horse Riding on the Beach",
  "alpha-sea-trip": "Alpha Sea Trip",
  parasailing: "Parasailing",
  "sub-marine": "Sea Scope Semi-Submarine",
  "dolphin-house": "Dolphin House",
  "orange-bay": "Orange Bay Island Trip",
  "paradise-island": "Paradise Island",
  "scuba-diving": "Scuba Diving",
  moto_safari: "Moto Safari",
  super_desert_safari: "Super Desert Safari",
  dolphin_show: "Dolphin Show",
  cairo: "Cairo Day Trip",
  luxor_country: "Luxor Country",
};

const TRIP_TYPE_BY_SLUG = Object.fromEntries(
  TRIP_TYPES.flatMap((t) => t.slugs.map((slug) => [slug, t])),
);
const DESTINATION_BY_NAME = Object.fromEntries(
  DESTINATIONS.map((d) => [d.name, d]),
);

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(file, value) {
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n", "utf8");
}

/** GET a URL as a Buffer, using fetch when available, else the https module. */
async function getBuffer(url, { retries = 2, timeoutMs = 20000 } = {}) {
  let lastErr;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      if (typeof fetch === "function") {
        const res = await fetch(url, {
          headers: { "User-Agent": USER_AGENT, Referer: REFERER },
          signal: AbortSignal.timeout(timeoutMs),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
        return Buffer.from(await res.arrayBuffer());
      }
      return await httpsGet(url, timeoutMs);
    } catch (err) {
      lastErr = err;
      if (attempt < retries) await sleep(400 * attempt);
    }
  }
  throw lastErr;
}

function httpsGet(url, timeoutMs) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      { headers: { "User-Agent": USER_AGENT, Referer: REFERER }, timeout: timeoutMs },
      (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          res.resume();
          resolve(httpsGet(new URL(res.headers.location, url).toString(), timeoutMs));
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      },
    );
    req.on("timeout", () => req.destroy(new Error(`Timeout for ${url}`)));
    req.on("error", reject);
  });
}

/** Decode the handful of HTML entities WooCommerce emits. */
function decodeEntities(input) {
  return String(input)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

const INVISIBLE = /[\u200B-\u200F\u2060\uFEFF]/g;

/** Convert an HTML blob to clean plain text, turning list items into "- " lines. */
function htmlToText(html) {
  if (!html) return "";
  let s = String(html);
  s = s.replace(/<\s*br\s*\/?>/gi, "\n");
  s = s.replace(/<\/\s*p\s*>/gi, "\n\n");
  s = s.replace(/<\s*li[^>]*>/gi, "\n- ");
  s = s.replace(/<\/\s*(ul|ol)\s*>/gi, "\n");
  s = s.replace(/<\/\s*(h[1-6]|div|tr)\s*>/gi, "\n");
  s = s.replace(/<[^>]+>/g, "");
  s = decodeEntities(s);
  s = s.replace(INVISIBLE, "");
  s = s
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n");
  s = s.replace(/\n{3,}/g, "\n\n").trim();
  return s;
}

function stripLeadingEmoji(line) {
  return line
    .replace(INVISIBLE, "")
    .replace(/^[\p{Extended_Pictographic}\uFE0F\u200B\s]+/u, "")
    .trim();
}

function isBullet(line) {
  return /^[-•*–—]\s*/.test(line) || /^\p{Extended_Pictographic}/u.test(line);
}

function cleanBullet(line) {
  let s = line.replace(/^[-•*–—]\s*/, "");
  s = stripLeadingEmoji(s);
  s = s.replace(/[\p{Extended_Pictographic}\uFE0F]+$/u, "").trim();
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

// Marketing/CTA lines that are not real trip content.
const FLUFF =
  /(spaces are limited|limited spots|grand opening|send us a dm|message us|whatsapp to secure|dm us|book (now|your)|contact us|follow us|subscribe|no hidden fees|best local price guaranteed|no booking (cost|fee)|don.?t miss|secure your|trusted tour operator|reserve (your|now)|premium service)/i;

// Section headings that introduce non-content prose; skip until a real
// content heading (includes/highlights/...) switches the bucket back on.
const SKIP_HEADING =
  /(why choose|book your|contact us|website:|phone\s*\/|whatsapp:|follow us|related (tours|packages)|get in touch)/i;

/**
 * Best-effort split of description bullets into the four structured lists.
 * - Heading detection uses emoji-stripped text so emoji-led headings work.
 * - Recognises "-", "–", "—" and emoji bullet markers.
 * - Stops at a "Frequently Asked Questions" section (FAQ + footer are not data).
 * - Marketing/CTA fluff and skip-section prose are dropped.
 */
function classifyBullets(text) {
  const out = { highlights: [], includes: [], excludes: [], whatToBring: [] };
  let bucket = "highlights";
  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    // FAQ + footer sections carry no structured trip data.
    if (/frequently asked questions/i.test(line)) break;

    const bare = stripLeadingEmoji(line).replace(/^[-•*–—]\s*/, "");
    const bareLower = bare.toLowerCase();
    const isItem = isBullet(line);
    const looksHeading =
      bare.length <= 70 &&
      bare.length > 0 &&
      (bare.endsWith(":") || bare.endsWith("?") || !isItem);

    if (looksHeading) {
      if (/(not included|exclud|exclusion)/.test(bareLower)) {
        bucket = "excludes";
        continue;
      }
      if (/(what.?s included|included|includes|inclusion|package include)/.test(bareLower)) {
        bucket = "includes";
        continue;
      }
      if (/(what to bring|\bbring\b|\bwear\b|take with|don.?t forget|\bpack\b|recommend)/.test(bareLower)) {
        bucket = "whatToBring";
        continue;
      }
      if (/(highlight|feature|what to expect|overview|itinerary|program|about this)/.test(bareLower)) {
        bucket = "highlights";
        continue;
      }
      if (SKIP_HEADING.test(bareLower) || bare.endsWith("?")) {
        bucket = null;
        continue;
      }
      if (bare.endsWith(":")) continue; // generic section header -> keep bucket
    }

    if (bucket && (isItem || bucket !== "highlights")) {
      const clean = cleanBullet(line);
      if (!clean || FLUFF.test(clean)) continue;
      if (!out[bucket].includes(clean)) out[bucket].push(clean);
    }
  }
  return out;
}

function loc(en) {
  return { en: en ?? "", fr: "", ru: "", ro: "" };
}

function locList(items) {
  return (items || []).map((it) => loc(it));
}

function extFromUrl(src) {
  try {
    const ext = path.extname(new URL(src).pathname).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"].includes(ext)
      ? ext
      : ".jpg";
  } catch {
    return ".jpg";
  }
}

function toPriceNumber(minorUnits, fallback = null) {
  const n = Number(minorUnits);
  if (!Number.isFinite(n)) return fallback;
  return Math.round(n) / 100;
}

function parseDuration(text) {
  const m = text.match(/(\d+)\s*(hours?|hrs?|days?|minutes?|mins?)/i);
  if (!m) return { value: null, typeName: null };
  const unit = m[2].toLowerCase();
  const typeName = unit.startsWith("h")
    ? "Hours"
    : unit.startsWith("d")
      ? "Days"
      : "Minutes";
  return { value: Number(m[1]), typeName };
}

function parseTimeFrom(text) {
  const m = text.match(/\b(\d{1,2}:\d{2}\s*[ap]\.?m\.?)\b/i);
  return m ? m[1].replace(/\s+/g, " ").trim() : null;
}

/* ------------------------------------------------------------------ */
/* Per-product processing                                              */
/* ------------------------------------------------------------------ */

async function downloadImages(product, imagesDir) {
  ensureDir(imagesDir);
  const sources = (product.images || [])
    .map((img) => ({
      src: img.src || img.thumbnail || "",
      alt: img.alt || img.name || "",
    }))
    .filter((img) => img.src);

  const results = [];
  let downloaded = 0;
  let skipped = 0;
  const failures = [];

  for (let i = 0; i < sources.length; i++) {
    const { src, alt } = sources[i];
    const index = String(i + 1).padStart(2, "0");
    const fileName = `${index}${extFromUrl(src)}`;
    const target = path.join(imagesDir, fileName);

    if (fs.existsSync(target) && fs.statSync(target).size > 0) {
      skipped++;
    } else {
      try {
        const buf = await getBuffer(src);
        fs.writeFileSync(target, buf);
        downloaded++;
      } catch (err) {
        failures.push({ src, error: err.message });
        continue; // do not reference an image we failed to save
      }
    }

    results.push({
      file: `images/${fileName}`,
      isPrimary: i === 0,
      originalSrc: src,
      alt,
    });
  }

  return { images: results, downloaded, skipped, failures };
}

function buildTripJson(product, images) {
  const slug = product.slug;
  const descriptionText = htmlToText(
    product.description || product.short_description || "",
  );
  const bullets = classifyBullets(descriptionText);
  const duration = parseDuration(descriptionText);
  const timeFrom = parseTimeFrom(descriptionText);

  const tripType = TRIP_TYPE_BY_SLUG[slug] || null;
  const destinationName = DESTINATION_BY_SLUG[slug] || "Hurghada";
  const destination = DESTINATION_BY_NAME[destinationName];

  const adultPrice = toPriceNumber(product.prices?.price);
  const currencyName = product.prices?.currency_code || "EUR";

  const missing = [];
  if (adultPrice === null) missing.push("adultPrice");
  missing.push("childPrice"); // never published on the source site
  if (!timeFrom) missing.push("timeFrom");
  if (duration.value === null) missing.push("durationValue");
  missing.push("durationType"); // numeric id unknown until backend duration types exist
  missing.push("availableDays");
  if (!bullets.includes.length) missing.push("includes");
  if (!bullets.excludes.length) missing.push("excludes");
  if (!bullets.whatToBring.length) missing.push("whatToBring");
  if (!bullets.highlights.length) missing.push("highlights");
  if (!tripType) missing.push("tripType");

  const originalName = decodeEntities(product.name || "").trim();
  const cleanName = NAME_BY_SLUG[slug] || originalName;

  return {
    name: loc(cleanName),
    description: loc(descriptionText),
    highlights: locList(bullets.highlights),
    includes: locList(bullets.includes),
    excludes: locList(bullets.excludes),
    whatToBring: locList(bullets.whatToBring),
    destination: destinationName,
    destinationId: destination ? destination.provisionalId : null,
    tripTypeName: tripType ? tripType.name : null,
    tripTypeId: tripType ? tripType.provisionalId : null,
    timeFrom,
    durationValue: duration.value,
    durationType: null,
    durationTypeName: duration.typeName,
    adultPrice,
    childPrice: null,
    currencyName,
    availableDays: [],
    isActive: true,
    images,
    _status: "first-pass",
    _source: {
      productId: product.id,
      slug,
      originalName,
      url: product.permalink || `https://safarihurghada.net/product/${slug}/`,
      categorySlugs: (product.categories || []).map((c) => c.slug),
      priceRaw: product.prices?.price ?? null,
      collectedAt: new Date().toISOString(),
    },
    _missing: [...new Set(missing)],
  };
}

/** True if a trip.json exists AND has been hand-curated (not a first-pass). */
function isCurated(tripFile) {
  if (!fs.existsSync(tripFile)) return false;
  try {
    const existing = JSON.parse(fs.readFileSync(tripFile, "utf8"));
    return Boolean(existing) && existing._status !== "first-pass";
  } catch {
    return false; // unreadable -> regenerate
  }
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

async function main() {
  console.log(`Fetching store products from:\n  ${STORE_API}\n`);
  ensureDir(RAW_DIR);
  ensureDir(REF_DIR);
  ensureDir(TRIPS_DIR);

  const rawBuf = await getBuffer(STORE_API);
  const products = JSON.parse(rawBuf.toString("utf8"));
  if (!Array.isArray(products)) {
    throw new Error("Unexpected Store API response (expected an array).");
  }
  fs.writeFileSync(
    path.join(RAW_DIR, "store-products.json"),
    JSON.stringify(products, null, 2) + "\n",
    "utf8",
  );
  console.log(`Saved raw snapshot: ${products.length} products\n`);

  // Reference catalogs (always refreshed).
  writeJson(path.join(REF_DIR, "destinations.json"), DESTINATIONS);
  writeJson(path.join(REF_DIR, "trip-types.json"), TRIP_TYPES);

  const catalog = [];
  const totals = { downloaded: 0, skipped: 0, failures: 0, curated: 0, firstPass: 0 };
  const allFailures = [];

  for (const product of products) {
    const slug = product.slug;
    const tripDir = path.join(TRIPS_DIR, slug);
    const imagesDir = path.join(tripDir, "images");
    ensureDir(tripDir);

    process.stdout.write(`- ${slug} ... `);
    const { images, downloaded, skipped, failures } = await downloadImages(
      product,
      imagesDir,
    );
    totals.downloaded += downloaded;
    totals.skipped += skipped;
    totals.failures += failures.length;
    if (failures.length) allFailures.push({ slug, failures });

    const tripFile = path.join(tripDir, "trip.json");
    let status;
    if (isCurated(tripFile)) {
      status = "curated"; // never clobber hand-curated data
      totals.curated++;
    } else {
      writeJson(tripFile, buildTripJson(product, images));
      status = "first-pass";
      totals.firstPass++;
    }

    catalog.push({
      slug,
      name: NAME_BY_SLUG[slug] || decodeEntities(product.name || "").trim(),
      adultPrice: toPriceNumber(product.prices?.price),
      currencyName: product.prices?.currency_code || "EUR",
      destination: DESTINATION_BY_SLUG[slug] || "Hurghada",
      tripType: TRIP_TYPE_BY_SLUG[slug]?.name || null,
      imageCount: images.length,
      status,
    });

    console.log(
      `${images.length} imgs (${downloaded} new, ${skipped} cached)` +
        (failures.length ? ` [${failures.length} FAILED]` : "") +
        ` -> ${status}`,
    );
  }

  writeJson(path.join(DATA_DIR, "catalog.json"), {
    source: STORE_API,
    collectedAt: new Date().toISOString(),
    tripCount: catalog.length,
    totalImages: catalog.reduce((sum, t) => sum + t.imageCount, 0),
    totals,
    trips: catalog,
  });

  console.log("\n==== Collection summary ====");
  console.log(`Trips:            ${catalog.length}`);
  console.log(`Images downloaded:${totals.downloaded}`);
  console.log(`Images cached:    ${totals.skipped}`);
  console.log(`Image failures:   ${totals.failures}`);
  console.log(`trip.json new:    ${totals.firstPass}`);
  console.log(`trip.json kept:   ${totals.curated}`);
  if (allFailures.length) {
    console.log("\nFailures:");
    for (const f of allFailures) {
      for (const fail of f.failures) console.log(`  ${f.slug}: ${fail.src} (${fail.error})`);
    }
  }
  console.log(`\nWrote catalog.json, raw/store-products.json, reference/*.json`);
}

main().catch((err) => {
  console.error("\nCollector failed:", err.message);
  process.exit(1);
});

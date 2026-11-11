# dataEntry - Collected Trip Data & Images

This folder holds every trip from the live site (https://safarihurghada.net/), collected
into a clean, import-ready structure so it can later be added to the Safari Hurghada
backend. The new backend (`https://hurghadsfariback.premiumasp.net/api/Trips`) is
currently empty, so this is the staging area for that content.

- Source of truth: the public **WooCommerce Store API**
  (`https://safarihurghada.net/wp-json/wc/store/v1/products?per_page=100`).
- Collected: **15 trips / 89 full-resolution images**.
- Language: **English only** for now (see "Languages" below).

## Re-collecting

```bash
node scripts/collect-trips.mjs     # or: bun run collect:trips
```

The collector is idempotent:
- Refreshes `raw/`, `reference/`, `catalog.json` and downloads any missing images.
- **Never overwrites** a `trips/<slug>/trip.json` whose `_status` is `"curated"`
  (all 15 are curated). To force-regenerate a trip, set its `_status` back to
  `"first-pass"` (or delete the file) and re-run.

> Note: the site hotlink-protects `wp-content/uploads`, so the script sends a
> same-origin `Referer` header. Images are downloaded with Node's built-in `fetch`
> (no wget/curl, no npm dependencies).

## Structure

```
dataEntry/
  README.md                 # this file
  catalog.json              # index of all 15 trips (slug, name, price, type, imageCount, status)
  raw/
    store-products.json     # verbatim Store API snapshot (do not edit)
  reference/
    destinations.json       # destination name -> provisional id
    trip-types.json         # curated trip-type taxonomy + slug assignments
  trips/
    <slug>/
      trip.json             # curated, import-ready trip record (see schema)
      images/
        01.<ext> ... NN.<ext>   # full-res downloads, API order, first = primary
```

## The 15 trips

| slug | name | EUR | trip type | destination | imgs |
|---|---|---|---|---|---|
| hula-hula-island-trip | Hula Hula Island Trip | 27 | Sea & Islands | Hurghada | 10 |
| adventour-submarine | Adventour Submarine & Magawish Island Cruise | 30 | Sea & Islands | Hurghada | 6 |
| horse-riding-on-the-beach | Horse Riding on the Beach | 20 | Beach Activities | Hurghada | 6 |
| alpha-sea-trip | Alpha Sea Trip | 30 | Sea & Islands | Hurghada | 10 |
| parasailing | Parasailing | 15 | Water Sports | Hurghada | 3 |
| sub-marine | Sea Scope Semi-Submarine | 15 | Diving & Snorkeling | Hurghada | 1 |
| dolphin-house | Dolphin House | 23 | Marine Life | Hurghada | 5 |
| orange-bay | Orange Bay Island Trip | 25 | Sea & Islands | Hurghada | 7 |
| paradise-island | Paradise Island | 45 | Sea & Islands | Hurghada | 1 |
| scuba-diving | Scuba Diving | 25 | Diving & Snorkeling | Hurghada | 6 |
| moto_safari | Moto Safari | 20 | Desert Safari | Hurghada | 8 |
| super_desert_safari | Super Desert Safari | 25 | Desert Safari | Hurghada | 9 |
| dolphin_show | Dolphin Show | 17 | Marine Life | Hurghada | 4 |
| cairo | Cairo Day Trip | 75 | City & Culture | Cairo | 8 |
| luxor_country | Luxor Country | 65 | City & Culture | Luxor | 5 |

## trip.json schema

Mirrors `TripFormValues` / `Trip` in `src/features/admin/trips/types.ts`. Localized
text fields use the shape `{ en, fr, ru, ro }`.

| field | notes |
|---|---|
| `name`, `description` | localized objects; `en` filled, others empty |
| `highlights`, `includes`, `excludes`, `whatToBring` | arrays of localized objects |
| `destination`, `destinationId` | name + provisional id (see `reference/destinations.json`) |
| `tripTypeName`, `tripTypeId` | curated taxonomy (see `reference/trip-types.json`) |
| `timeFrom`, `durationValue`, `durationType`, `durationTypeName` | best-effort from source text |
| `adultPrice`, `childPrice`, `currencyName` | price converted from minor units (e.g. `2700` -> `27`) |
| `availableDays`, `isActive` | `availableDays` empty; `isActive` true |
| `images[]` | `{ file, isPrimary, originalSrc, alt }`, ordered, first is primary |
| `_status` | `"curated"` (locked) or `"first-pass"` (auto-generated, refreshable) |
| `_source` | provenance: `productId`, `slug`, `originalName`, `url`, `priceRaw`, `collectedAt` |
| `_missing` | fields the source did not provide - **fill these before import** |

## Languages

The backend stores content in four languages: `en`, `fr`, `ru` (labelled German/DE)
and `ro` (labelled Polish/PL) - see `src/features/admin/shared/languages.ts`. Only
`en` is populated here. At import time the admin API's `cleanLocalizedText` falls back
any empty language to English, so translations can be added later without breaking
anything. Only the `en` locale is currently active in the app (`src/i18n/locales.ts`).

## Manual input required before import

These values are not published on the source site and are flagged in each trip's
`_missing`. They were intentionally **not invented**:

- `childPrice` - all trips (source shows a single per-person price).
- `durationType` (numeric id) - all trips; `durationValue`/`durationTypeName` are
  best-effort and missing on some.
- `timeFrom` and `availableDays` - most trips.
- `excludes` - all trips (source rarely states exclusions).
- `paradise-island` has an **empty description** on the source site and needs content
  written manually (name, description, highlights, includes).

## Import path (later, not automated yet)

Once the backend is ready, import in this order using the existing admin API modules:

1. Create destinations - `src/features/admin/destinations/api.ts`.
2. Create trip types - `src/features/admin/trip-types/api.ts`.
3. For each trip: `createTrip()` -> `uploadTripImages()` (the files in `images/`) ->
   `setPrimaryTripImage()` - all in `src/features/admin/trips/api.ts`.
   Resolve `destination`/`tripType` names to the backend-assigned ids (the
   `provisionalId` values here are placeholders because the backend is empty).

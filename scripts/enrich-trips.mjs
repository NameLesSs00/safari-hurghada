import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TRIPS_DIR = path.join(ROOT, "dataEntry", "trips");

const EVERYDAY = [0, 1, 2, 3, 4, 5, 6];

const ENRICHED_DATA = {
  "moto_safari": {
    name: "Hurghada Quad Bike Moto Safari Adventure",
    destinationId: 2,
    destination: "Hurghada",
    tripTypeId: 5,
    tripTypeName: "Safari excursions",
    timeFrom: "14:00:00",
    durationValue: 3,
    durationType: 0,
    durationTypeName: "Hours",
    adultPrice: 20,
    childPrice: 10,
    currencyName: "EUR",
    availabilityDayNo: EVERYDAY,
    isActive: true,
    description: `Experience the raw beauty of the Egyptian desert on an adrenaline-pumping Hurghada Quad Bike Moto Safari! Leave the city resort behind and conquer the golden dunes on your own powerful all-terrain vehicle (ATV). Guided by experienced desert leaders, this exciting desert adventure takes you across rugged mountainous terrain into the heart of the Red Sea desert.

Arrive at an authentic Bedouin settlement where warm hospitality awaits. Relax in traditional Bedouin tents, sip fragrant herbal Bedouin tea, and learn about the timeless customs, nomadic lifestyle, and survival traditions of desert inhabitants. Enjoy a peaceful camel ride across the sands and watch the breathtaking desert sunset casting golden hues across the surrounding mountains.

Whether you are seeking thrills, culture, or unforgettable photo opportunities, the Hurghada Quad Bike Moto Safari delivers an authentic, safe, and exhilarating Egyptian adventure suitable for both solo travelers and families.`,
    highlights: [
      "Conquer dramatic desert dunes on high-performance 250cc Quad ATVs",
      "Comprehensive safety briefing and practice test drive before heading into the desert",
      "Authentic Bedouin camp visit with traditional herbal tea hospitality",
      "Short scenic camel trek across the open desert sands",
      "Witness a mesmerizing panoramic sunset over the Red Sea desert mountains",
      "Convenient round-trip hotel transfers in air-conditioned vehicles included"
    ],
    includes: [
      "Round-trip air-conditioned hotel pickup and drop-off in Hurghada",
      "Modern quad bike rental with protective helmet and full safety gear",
      "Professional English-speaking desert safari guide and lead escort",
      "Visit to traditional Bedouin village and cultural insight",
      "Complimentary Bedouin tea and bottled water",
      "Short camel ride experience"
    ],
    excludes: [
      "Bedouin scarf (Shemagh) and dust goggles (available for rent/purchase on site)",
      "Professional photo & video packages (optional purchase from local camera crew)",
      "Gratuities and tips for guides and drivers",
      "Transfer surcharge from Makadi Bay, El Gouna, Soma Bay, or Sahl Hasheesh (€5–€10 per person)"
    ],
    whatToBring: [
      "Comfortable casual clothing (long trousers recommended for quad riding)",
      "Sturdy closed-toe sports shoes (no flip-flops on quad bikes)",
      "Sunglasses and protective sun cream",
      "Keffiyeh / scarf to protect face against desert dust and sand",
      "Cash for personal extras, tipping, and souvenirs",
      "Camera or smartphone with secure strap"
    ]
  },

  "super_desert_safari": {
    name: "Super Desert Safari: Quad, Spider Buggy, Camel & Bedouin Show",
    destinationId: 2,
    destination: "Hurghada",
    tripTypeId: 5,
    tripTypeName: "Safari excursions",
    timeFrom: "13:30:00",
    durationValue: 5,
    durationType: 0,
    durationTypeName: "Hours",
    adultPrice: 25,
    childPrice: 15,
    currencyName: "EUR",
    availabilityDayNo: EVERYDAY,
    isActive: true,
    description: `Immerse yourself in the ultimate Red Sea desert safari with our all-inclusive Super Desert Safari in Hurghada! Combining extreme motor thrills, traditional desert travel, and captivating oriental entertainment, this action-packed tour is the most popular desert adventure in Egypt.

Your adventure begins with a rugged 4x4 Land Cruiser drive deep into the Eastern Sahara, followed by exhilarating rides on both powerful Quad ATVs and agile Spider Buggies. Feel the surge of adrenaline as you speed across the sand dunes against the backdrop of dramatic mountain ranges. Switch gears to a slower, authentic pace with a tranquil camel ride before touring a genuine Bedouin village to observe bread making, herbal remedies, and nomadic culture.

As dusk settles, enjoy a magnificent open-buffet oriental barbecue dinner served under the starry desert sky. The evening culminates with a vibrant live performance featuring mesmerizing Tanoura spinning folk dancers, captivating fire acrobats, and belly dancing.`,
    highlights: [
      "The complete desert combo: 4x4 Jeep transfer, Quad ATV riding, and Spider Buggy driving",
      "Authentic Bedouin village exploration and traditional bread baking demonstration",
      "Tranquil camel trek through golden sand dunes",
      "Delicious open-buffet BBQ dinner with fresh grilled meats, salads, and soft drinks",
      "Spectacular evening folklore show: Tanoura spinning dancers, Fire acrobats & Belly dancing",
      "Stargazing opportunity in the crisp, unpolluted night desert sky",
      "Full round-trip air-conditioned hotel transport from Hurghada included"
    ],
    includes: [
      "Round-trip hotel transfers in air-conditioned vehicles",
      "Desert 4x4 Land Cruiser jeep transport",
      "Quad bike (ATV) ride (approx. 45 minutes)",
      "Spider buggy driving experience (approx. 15–20 minutes)",
      "Camel ride in the desert",
      "Bedouin village tour and traditional herbal tea",
      "Open-buffet barbecue dinner with soft drinks and mineral water",
      "Live oriental entertainment show (Tanoura, Fire show, Belly dancer)",
      "Professional safari guide throughout the tour"
    ],
    excludes: [
      "Desert scarf (Arafat scarf) and goggles (available at base camp)",
      "Professional photo & video media services",
      "Tipping and personal expenses",
      "Transfer surcharge from distant hotel zones (El Gouna, Makadi Bay, Soma Bay)"
    ],
    whatToBring: [
      "Comfortable long trousers and lightweight jacket for the cooler desert evening",
      "Closed sports shoes",
      "Sunglasses and sunscreen",
      "Scarf / Shemagh to cover hair and face",
      "Camera / phone for sunset and show photography",
      "Pocket cash for souvenirs and tips"
    ]
  },

  "horse-riding-on-the-beach": {
    name: "Horse Riding on the Beach & Desert in Hurghada",
    destinationId: 2,
    destination: "Hurghada",
    tripTypeId: 9,
    tripTypeName: "Horse riding ",
    timeFrom: "09:00:00",
    durationValue: 2,
    durationType: 0,
    durationTypeName: "Hours",
    adultPrice: 20,
    childPrice: 12,
    currencyName: "EUR",
    availabilityDayNo: EVERYDAY,
    isActive: true,
    description: `Experience the pure magic of horseback riding along the picturesque coast of Hurghada. Whether you are an experienced equestrian or a complete first-time rider, this scenic ride along pristine Red Sea beaches and desert trails offers tranquility, beauty, and unforgettable memories.

Our well-trained, gentle Arabian horses are suitable for riders of all skill levels, from young children to advanced equestrians. Before departure, our professional trainers conduct an introductory briefing and pair you with the ideal horse matched to your experience and confidence level.

Ride across the golden coastal sands, take your horse into the shallow turquoise waters of the Red Sea for an invigorating splash, and explore peaceful desert paths. With morning departures avoiding the peak midday sun and romantic afternoon slots catching the sunset glow, this is one of the most serene adventures available in Hurghada.`,
    highlights: [
      "Scenic horseback ride along pristine Red Sea beaches and tranquil desert paths",
      "Unique opportunity to take horses into the crystal-clear shallow seawater",
      "Gentle, healthy, and exceptionally well-trained Arabian and crossbreed horses",
      "Suitable for all skill levels from absolute beginners and children to seasoned riders",
      "Personalized pairing with horses based on your height, weight, and experience level",
      "Professional equestrian guides ensuring total safety and assistance",
      "Hotel pickup and drop-off included"
    ],
    includes: [
      "Round-trip hotel transfers in Hurghada",
      "2-hour guided horseback ride (beach and desert route)",
      "Safety riding helmet and necessary riding equipment",
      "Professional instructor and guide accompanying the ride",
      "Seawater swimming/wading experience with horses (weather permitting)"
    ],
    excludes: [
      "Professional photography and video service",
      "Gratuities for the stable staff and guide",
      "Transfers outside central Hurghada (available upon request for a small supplement)"
    ],
    whatToBring: [
      "Comfortable long pants / riding trousers to prevent saddle chafing",
      "Closed-toe shoes or boots (sandals and flip-flops are not allowed)",
      "Sunscreen and sunglasses",
      "Camera or phone with a secure pouch or strap",
      "Water bottle and cash for personal tips"
    ]
  },

  "orange-bay": {
    name: "Orange Bay Island Day Trip & Snorkeling Cruise",
    destinationId: 2,
    destination: "Hurghada",
    tripTypeId: 4,
    tripTypeName: "Snorkelling",
    timeFrom: "08:30:00",
    durationValue: 7,
    durationType: 0,
    durationTypeName: "Hours",
    adultPrice: 25,
    childPrice: 15,
    currencyName: "EUR",
    availabilityDayNo: EVERYDAY,
    isActive: true,
    description: `Sail to the world-famous Orange Bay Island on Giftun National Park — fondly celebrated as the “Egyptian Caribbean”. With powdery white sands, shallow turquoise waters, and iconic wooden overwater swings and hammocks, Orange Bay is the premier tropical island destination in Hurghada.

Board a spacious, modern luxury cruise boat at the marina and embark on a relaxing voyage across the sparkling Red Sea. The day features two distinct guided snorkeling stops at pristine offshore coral reefs where vibrant marine life, sea turtles, and colorful schools of tropical fish flourish.

Spend approximately 2 full hours on Orange Bay Island relaxing on comfortable beanbags, swimming in the warm crystal lagoon, capturing postcard-worthy photos, and soaking in the sun. Back onboard, enjoy a freshly prepared open-buffet lunch featuring grilled specialties, fish, pasta, fresh salads, and unlimited soft drinks. Fun water sports like banana boat and sofa rides complete an unforgettable island cruise.`,
    highlights: [
      "Approx. 2 hours on the stunning white sands and turquoise waters of Orange Bay Island",
      "Iconic photo spots including the famous overwater swings and wooden island walkways",
      "2 guided snorkeling sessions at Hurghada's richest coral reef marine reserves",
      "Full snorkeling equipment provided (mask, snorkel, fins, and life jackets)",
      "Delicious freshly prepared open-buffet lunch served onboard the luxury yacht",
      "Complimentary soft drinks, mineral water, coffee, and tea available all day",
      "Exciting banana boat and inflatable sofa tube rides included",
      "Round-trip air-conditioned hotel pickup and return"
    ],
    includes: [
      "Round-trip transfers from any hotel in Hurghada",
      "Luxury boat cruise with shaded sundeck and comfortable lounging areas",
      "Orange Bay Island entrance fees and taxes",
      "2 guided snorkeling stops with a certified divemaster",
      "Complete snorkeling gear (mask, snorkel, fins, buoyancy vest)",
      "Freshly prepared buffet lunch onboard",
      "All-day soft drinks, bottled water, tea, and coffee",
      "Water sports fun: Banana boat & Inflatable sofa ride"
    ],
    excludes: [
      "National Park marine conservation fee ($5 / €5 per person paid at marina)",
      "Professional photo & video packages",
      "Personal expenses and tipping",
      "Transfers from Makadi Bay, Sahl Hasheesh, El Gouna, or Soma Bay (€5–€10 surcharge)"
    ],
    whatToBring: [
      "Swimwear and beach towels from your hotel",
      "Sunscreen, sunglasses, and sun hat",
      "Change of comfortable dry clothes",
      "Underwater camera or phone with waterproof pouch",
      "Passports or copies of passports (required by coast guard)",
      "Cash for national park marine fee and tips"
    ]
  },

  "paradise-island": {
    name: "Paradise Island Luxury Day Cruise & Snorkeling Tour",
    destinationId: 2,
    destination: "Hurghada",
    tripTypeId: 4,
    tripTypeName: "Snorkelling",
    timeFrom: "08:30:00",
    durationValue: 7,
    durationType: 0,
    durationTypeName: "Hours",
    adultPrice: 45,
    childPrice: 25,
    currencyName: "EUR",
    availabilityDayNo: EVERYDAY,
    isActive: true,
    description: `Discover true luxury and island relaxation on Paradise Island, the jewel of Giftun Island National Park. Featuring exclusive white-sand beaches, premium loungers with shade umbrellas, crystal-clear lagoons, and top-tier amenities, Paradise Island offers an elevated day trip experience for discerning travelers in Hurghada.

Cruise across the deep blue Red Sea aboard an elegant motor yacht. Along the journey, stop at two handpicked snorkeling sites renowned for healthy coral gardens and exceptional underwater visibility, where you can swim alongside clownfish, stingrays, and vibrant schools of reef fish under the supervision of professional guides.

Step ashore onto Paradise Island's private beach for hours of pure bliss. Enjoy access to beach bars, music, oriental folklore performances, and a gourmet beachfront or onboard buffet lunch prepared by executive chefs. Conclude your voyage with thrilling banana boat and watersports rides before cruising back to the marina.`,
    highlights: [
      "VIP island excursion to the exclusive private beaches of Paradise Island (Giftun)",
      "Relax in shaded wooden umbrellas, plush sunbeds, and crystal lagoons",
      "2 premier offshore reef snorkeling stops with top-quality equipment",
      "Sumptuous gourmet open-buffet lunch with fresh seafood, grilled meats, and salads",
      "Live island entertainment and folklore show on select departures",
      "All-day refreshments: fruit juices, soft drinks, mineral water, coffee, and tea",
      "Banana boat and water sofa rides included for the whole family",
      "Full round-trip air-conditioned hotel transport"
    ],
    includes: [
      "Hotel pickup and drop-off in Hurghada",
      "Full-day luxury yacht cruise to Paradise Island",
      "Paradise Island admission tickets, beach lounger, and umbrella access",
      "2 guided snorkeling sessions with marine instructors",
      "Full set of snorkeling equipment (masks, snorkels, fins, life jackets)",
      "Open-buffet lunch with seafood, chicken, pasta, and fresh salads",
      "Unlimited soft drinks, mineral water, tea, and coffee onboard",
      "Banana boat and water sport rides"
    ],
    excludes: [
      "National Park entrance fee ($5 / €5 per guest)",
      "Specialty cocktails and alcoholic beverages at the island beach bar",
      "Professional photos and videography",
      "Transfers from outlying resort zones (El Gouna, Makadi, Soma Bay)"
    ],
    whatToBring: [
      "Swimsuits and beach towels",
      "High SPF sunscreen and sunglasses",
      "Waterproof phone bag or action camera",
      "Passports (mandatory for marina coastguard manifest)",
      "Cash for park fee, bar drinks, and tips"
    ]
  },

  "hula-hula-island-trip": {
    name: "Hula Hula Island Trip & Snorkeling Excursion",
    destinationId: 2,
    destination: "Hurghada",
    tripTypeId: 4,
    tripTypeName: "Snorkelling",
    timeFrom: "08:30:00",
    durationValue: 7,
    durationType: 0,
    durationTypeName: "Hours",
    adultPrice: 27,
    childPrice: 15,
    currencyName: "EUR",
    availabilityDayNo: EVERYDAY,
    isActive: true,
    description: `Escape to tropical paradise with the Hula Hula Island Trip from Hurghada! Located on the pristine shores of the Giftun archipelago, Hula Hula Island combines Hawaiian-themed beach ambiance, soft white sands, and shallow azure waters ideal for swimming, relaxing, and sunbathing.

Your voyage starts aboard a comfortable cruiser sailing across the Red Sea. During the trip, our certified snorkeling guides lead two guided snorkeling stops at secluded coral reefs teeming with colorful coral formations, sea anemones, and exotic marine creatures.

On Hula Hula Island, spend relaxing hours soaking up the sun in shaded lounge areas, strolling along sandy sandbars, and taking breathtaking photos. Savor a delicious buffet lunch onboard with unlimited hot and cold beverages, and cap off your day with thrilling banana boat rides.`,
    highlights: [
      "Visit the fun, vibrant tropical setting of Hula Hula Island",
      "Soft white sand beach and calm, crystal-clear turquoise waters perfect for all ages",
      "2 guided open-sea snorkeling stops at prime Red Sea reef spots",
      "Complete snorkeling gear provided free of charge",
      "Delicious buffet lunch served onboard with fresh salads and hot dishes",
      "Unlimited soft drinks, tea, coffee, and bottled water throughout the day",
      "Exciting banana boat and water tube rides included",
      "Hassle-free hotel pickup and drop-off"
    ],
    includes: [
      "Round-trip hotel transfers in Hurghada",
      "Full-day boat cruise with experienced captain and crew",
      "Hula Hula Island entrance tickets and beach facilities",
      "2 guided reef snorkeling stops",
      "Snorkeling masks, snorkels, fins, and safety life vests",
      "Open-buffet lunch onboard",
      "Free-flowing soft drinks, mineral water, coffee, and tea",
      "Banana boat water sports"
    ],
    excludes: [
      "Marine Reserve environmental fee ($5 / €5 per person)",
      "Photo and video media services",
      "Personal expenses and crew gratuities",
      "Transfers from Soma Bay, Makadi Bay, or El Gouna (€5–€10 surcharge)"
    ],
    whatToBring: [
      "Beach towels and swimwear",
      "Sun hat, sunglasses, and coral-safe sunscreen",
      "Passports or photo ID for the boat manifest",
      "Camera or phone with waterproof protection",
      "Cash for environmental fee and optional souvenirs"
    ]
  },

  "adventour-submarine": {
    name: "Adventour Submarine & Magawish Island Cruise",
    destinationId: 2,
    destination: "Hurghada",
    tripTypeId: 10,
    tripTypeName: "diving ",
    timeFrom: "10:30:00",
    durationValue: 3,
    durationType: 0,
    durationTypeName: "Hours",
    adultPrice: 30,
    childPrice: 18,
    currencyName: "EUR",
    availabilityDayNo: EVERYDAY,
    isActive: true,
    description: `Dive beneath the surface of the Red Sea without getting wet aboard the Adventour Submarine & Magawish Island Cruise! This unique hybrid excursion combines the underwater wonder of a deep-view semi-submarine with a scenic boat cruise past the pristine Magawish Islands.

Descend into the air-conditioned underwater observatory cabin located 3 to 4 meters below sea level. Through massive panoramic glass viewing windows, enjoy unobstructed, front-row views of living coral reefs, sea turtles, manta rays, and thousands of vibrant tropical fish as divers feed the fish directly in front of your window.

Following the underwater exploration, head up to the open sun deck for a relaxing cruise through the Magawish archipelago, with opportunities for swimming, surface snorkeling in crystal-clear waters, and soaking up the warm Egyptian sun.`,
    highlights: [
      "Submerge into the Red Sea in a modern, air-conditioned underwater viewing observatory",
      "Huge panoramic glass windows providing crystal-clear 360-degree marine views",
      "Live diver fish-feeding show right outside your window for incredible photos",
      "Scenic cruise around the gorgeous Magawish Islands",
      "Swimming and snorkeling stop in pristine turquoise lagoon waters",
      "Ideal for families, non-swimmers, and young children",
      "Hotel pickup and drop-off in central Hurghada included"
    ],
    includes: [
      "Round-trip hotel transfers in Hurghada",
      "Submarine underwater viewing tour (approx. 45–60 minutes underwater)",
      "Magawish Island scenic cruise and snorkeling stop",
      "Snorkeling equipment and safety life jackets",
      "Complimentary soft drink and bottled water",
      "English-speaking guide and marine educator"
    ],
    excludes: [
      "Professional photo & video CD",
      "Tips and personal gratuities",
      "Hotel transfer surcharge outside central Hurghada"
    ],
    whatToBring: [
      "Camera or smartphone with plenty of battery and memory",
      "Swimsuit and towel (for the swimming stop)",
      "Sunglasses and sun hat",
      "Cash for tips and refreshments"
    ]
  },

  "alpha-sea-trip": {
    name: "Alpha Sea Trip VIP Luxury Yacht Cruise & Snorkeling",
    destinationId: 2,
    destination: "Hurghada",
    tripTypeId: 4,
    tripTypeName: "Snorkelling",
    timeFrom: "08:30:00",
    durationValue: 7,
    durationType: 0,
    durationTypeName: "Hours",
    adultPrice: 30,
    childPrice: 18,
    currencyName: "EUR",
    availabilityDayNo: EVERYDAY,
    isActive: true,
    description: `Elevate your Red Sea holiday with the Alpha Sea Trip — Hurghada's top-rated luxury yacht excursion. Designed for travelers who appreciate premium comfort, uncrowded sundecks, and exceptional service, this full-day cruise delivers a first-class maritime experience.

Sail across the sapphire waters of the Red Sea aboard a sleek, modern yacht equipped with spacious sun loungers, shaded dining salons, and freshwater showers. You will visit two of the most breathtaking snorkeling reefs in the Hurghada marine reserve, guided by expert marine biologists who help you identify exotic corals, rays, and tropical species.

Relish a gourmet seafood and barbecue open-buffet lunch freshly prepared by the yacht's private chef, featuring grilled shrimp, calamari, chicken, pastas, and fresh salads. Enjoy an island beach stop, fun watersport rides, and complimentary all-day refreshments in a relaxed VIP atmosphere.`,
    highlights: [
      "VIP cruising experience on a luxury, high-end motor yacht",
      "2 premium guided snorkeling sessions at Hurghada's richest coral reefs",
      "Scenic island beach stop for sunbathing and swimming",
      "Gourmet seafood and BBQ buffet lunch with shrimp, calamari, grilled meats, and salads",
      "High-quality snorkeling masks, fins, and life jackets included",
      "Unlimited hot and cold beverages: soft drinks, juices, mineral water, tea, and espresso",
      "Inflatable banana boat and crazy sofa rides included",
      "Full hotel transfers in air-conditioned vehicles"
    ],
    includes: [
      "Hotel pickup and return in central Hurghada",
      "Full-day luxury yacht charter with certified captain and crew",
      "2 snorkeling stops with professional marine guides",
      "Top-tier snorkeling equipment",
      "Gourmet seafood & meat open-buffet lunch",
      "Unlimited beverages throughout the entire trip",
      "Banana boat and water sofa rides"
    ],
    excludes: [
      "Marine protectorate environmental fee ($5 / €5 per guest)",
      "Professional photo and DVD media",
      "Gratuities for the yacht crew",
      "Transfer fee from distant resort zones"
    ],
    whatToBring: [
      "Swimwear and beach towel",
      "Sun protection (cream, glasses, hat)",
      "Passports for boat registration",
      "Underwater camera",
      "Pocket cash for national park fee and tips"
    ]
  },

  "sub-marine": {
    name: "Sea Scope Semi-Submarine Underwater Tour",
    destinationId: 2,
    destination: "Hurghada",
    tripTypeId: 10,
    tripTypeName: "diving ",
    timeFrom: "10:00:00",
    durationValue: 2,
    durationType: 0,
    durationTypeName: "Hours",
    adultPrice: 15,
    childPrice: 8,
    currencyName: "EUR",
    availabilityDayNo: EVERYDAY,
    isActive: true,
    description: `Marvel at the magical world of the Red Sea without getting wet on the Sea Scope Semi-Submarine tour! Designed specifically for curious travelers of all ages, families with young children, and seniors, this semi-submersible craft offers a magical submarine experience in total air-conditioned comfort.

Sit comfortably in individual swivel seats positioned next to expansive optical viewing windows 3 meters underwater. As the semi-submarine glides smoothly alongside Hurghada's vibrant coral reefs, admire magnificent brain corals, sea fans, clownfish, parrotfish, moray eels, and graceful rays in their natural habitat.

A live diver accompanies the tour, feeding the fish directly in front of the windows so you can capture incredible close-up photos and videos. After the underwater exploration, head up to the open observation deck for a scenic coastal cruise back to the marina.`,
    highlights: [
      "Subsurface underwater viewing at 3 meters depth in air-conditioned comfort",
      "Large personal panoramic glass windows for every passenger",
      "Thrilling live diver fish-feeding performance right outside the windows",
      "Perfect family-friendly excursion for toddlers, seniors, and non-swimmers",
      "Spectacular close-up views of Red Sea corals and exotic marine species",
      "Scenic coastal cruise along the Hurghada shoreline from the sun deck",
      "Round-trip hotel transfers included"
    ],
    includes: [
      "Round-trip transfers from Hurghada hotels",
      "90-minute semi-submarine cruise (approx. 45–50 minutes underwater viewing)",
      "Air-conditioned underwater cabin with panoramic glass windows",
      "Live diver fish-feeding show",
      "Complimentary soft drink or bottled water",
      "Multilingual tour guide"
    ],
    excludes: [
      "Professional photographs and video DVD",
      "Personal tipping and gratuities",
      "Transfer surcharge from Makadi, El Gouna, or Soma Bay"
    ],
    whatToBring: [
      "Camera or smartphone (turn off flash for best photos through glass)",
      "Sunglasses and light clothing",
      "Small change for tips and souvenirs"
    ]
  },

  "dolphin-house": {
    name: "Dolphin House Snorkeling Trip with Wild Dolphins",
    destinationId: 2,
    destination: "Hurghada",
    tripTypeId: 4,
    tripTypeName: "Snorkelling",
    timeFrom: "08:00:00",
    durationValue: 7,
    durationType: 0,
    durationTypeName: "Hours",
    adultPrice: 23,
    childPrice: 13,
    currencyName: "EUR",
    availabilityDayNo: EVERYDAY,
    isActive: true,
    description: `Fulfill your dream of seeing wild dolphins in their natural ocean habitat with our famous Dolphin House Snorkeling Trip in Hurghada! Journey by boat to Sha'ab El Erg, a protected horseshoe-shaped coral reef famous worldwide as the gathering place for playful pods of wild spinner and bottlenose dolphins.

Experience the breathtaking thrill of watching these intelligent creatures leap and play in the waves alongside the boat. When conditions permit, jump into the crystal-clear water with our certified snorkeling guides for an unforgettable swim in close proximity to the dolphin pods — an ethical, wild encounter that respects marine wildlife.

The tour also includes two guided snorkeling stops at vibrant offshore reefs teeming with diverse corals and marine life, a freshly prepared buffet lunch served onboard, and fun watersport activities including banana boat rides.`,
    highlights: [
      "High probability of encountering playful wild dolphin pods in their natural habitat",
      "Opportunity to swim and snorkel near dolphins under ethical, guided supervision",
      "2 additional snorkeling stops at vibrant protected coral reef gardens",
      "Complete snorkeling equipment provided (mask, snorkel, fins, and life jackets)",
      "Delicious freshly prepared hot buffet lunch served onboard",
      "Complimentary soft drinks, mineral water, tea, and coffee all day",
      "Fun watersports: Banana boat and sofa tube rides included",
      "Full round-trip hotel transfers in air-conditioned comfort"
    ],
    includes: [
      "Hotel pickup and drop-off in Hurghada",
      "Full-day boat cruise with experienced dolphin-spotting captain and crew",
      "2 to 3 guided snorkeling sessions including Dolphin House reef",
      "Full set of snorkeling gear and life jackets",
      "Open-buffet lunch onboard the boat",
      "Unlimited soft drinks, mineral water, tea, and coffee",
      "Banana boat and water sofa rides"
    ],
    excludes: [
      "National park environmental fee ($5 / €5 per guest)",
      "Professional photo & video packages",
      "Gratuities for the crew and guides",
      "Transfers from outside central Hurghada (El Gouna, Makadi, Soma Bay)"
    ],
    whatToBring: [
      "Swimsuits and hotel towels",
      "Eco-friendly sunscreen and sunglasses",
      "Waterproof camera or GoPro with floating grip",
      "Passports for coastguard manifest verification",
      "Cash for national park fee and tips"
    ]
  },

  "dolphin_show": {
    name: "Hurghada Dolphin & Sea Lion Show at Dolphin World",
    destinationId: 2,
    destination: "Hurghada",
    tripTypeId: 11,
    tripTypeName: "Activities ",
    timeFrom: "14:00:00",
    durationValue: 2,
    durationType: 0,
    durationTypeName: "Hours",
    adultPrice: 17,
    childPrice: 10,
    currencyName: "EUR",
    availabilityDayNo: EVERYDAY,
    isActive: true,
    description: `Treat the whole family to an unforgettable afternoon of laughter, music, and amazement at Hurghada's premier Dolphin Show at Dolphin World! Watch in awe as highly trained dolphins, playful sea lions, and charming walruses showcase their extraordinary intelligence and athletic abilities.

During this dynamic 1-hour live performance, you will see dolphins performing high-flying synchronized jumps, playing with basketballs, painting, and dancing to cheerful music. The humorous antics of the sea lions will delight audiences of all ages, making this excursion a favorite choice for families with children.

After the performance, you have the optional opportunity to take professional souvenir photos with the dolphins or even book a once-in-a-lifetime private swimming session with these gentle marine animals.`,
    highlights: [
      "Spectacular 1-hour live acrobatic show with dolphins, sea lions, and seals",
      "Amazing synchronized jumps, ball tricks, singing, and dancing routines",
      "Comfortable shaded amphitheater seating with excellent views from every angle",
      "Perfect family entertainment suitable for guests of all ages",
      "Optional photo opportunity and swimming with dolphins (bookable on site)",
      "Stress-free round-trip hotel transfers in air-conditioned vehicles"
    ],
    includes: [
      "Round-trip hotel transfers from Hurghada",
      "Official entry ticket to Dolphin World show",
      "Full 1-hour live dolphin and sea lion performance",
      "Comfortable stadium seating in covered arena"
    ],
    excludes: [
      "Optional swimming with dolphins session",
      "Souvenir photos with dolphins taken by professional arena photographers",
      "Food, snacks, and beverages inside the facility",
      "Gratuities and personal expenses",
      "Transfer supplement from outlying resort areas"
    ],
    whatToBring: [
      "Camera or smartphone to capture the exciting show",
      "Light casual clothing and sunglasses",
      "Cash for souvenir photos, refreshments, or tipping"
    ]
  },

  "parasailing": {
    name: "Parasailing Adventure over Hurghada Red Sea",
    destinationId: 2,
    destination: "Hurghada",
    tripTypeId: 12,
    tripTypeName: "Water Sports",
    timeFrom: "10:00:00",
    durationValue: 1,
    durationType: 0,
    durationTypeName: "Hours",
    adultPrice: 15,
    childPrice: 12,
    currencyName: "EUR",
    availabilityDayNo: EVERYDAY,
    isActive: true,
    description: `Soar high above the sparkling turquoise waters of the Red Sea on an exhilarating Hurghada Parasailing Adventure! Feel the incredible sensation of weightlessness as your parachute gently lifts you 40 to 50 meters into the sky behind a high-powered, purpose-built speedboat.

From this breathtaking bird's-eye vantage point, marvel at 360-degree panoramic views of Hurghada's coastline, golden desert mountains, and the striking contrast of shallow turquoise lagoons against deep blue ocean waters. You can fly solo, fly tandem with a friend or loved one, or fly triple for an unforgettable shared experience.

Takeoff and landing occur smoothly and safely directly from the hydraulic platform on the back of the boat — you don't even need to touch the water unless you ask the friendly captain for a refreshing dip before landing! With certified equipment and experienced captains, safety and thrills are guaranteed.`,
    highlights: [
      "Breathtaking bird's-eye views of the Red Sea, Hurghada coastline, and desert mountains",
      "Soar 40 to 50 meters above the sea in total safety and comfort",
      "Available as single, tandem (2 persons), or triple flights",
      "Smooth hydraulic winch takeoff and landing directly on the boat deck",
      "State-of-the-art European certified parasailing equipment and life jackets",
      "Exciting speedboat ride in Hurghada bay",
      "Convenient round-trip hotel transfers included"
    ],
    includes: [
      "Round-trip hotel transfers in Hurghada",
      "Speedboat ride in Hurghada marina bay",
      "10–12 minutes exhilarating parasailing flight",
      "Certified parasailing harness, parachute, and life jacket",
      "Professional, safety-certified captain and flight crew"
    ],
    excludes: [
      "GoPro flight video and photo session (available from boat crew)",
      "Gratuities for the boat crew",
      "Transfer fee from distant resort areas"
    ],
    whatToBring: [
      "Swimsuit, shorts, or light casual beachwear",
      "Sunglasses and sunscreen",
      "Action camera or phone with secure wrist strap",
      "Cash for tips or photo packages"
    ]
  },

  "scuba-diving": {
    name: "Hurghada Scuba Diving Day Trip with 2 Dives & Lunch",
    destinationId: 2,
    destination: "Hurghada",
    tripTypeId: 10,
    tripTypeName: "diving ",
    timeFrom: "08:30:00",
    durationValue: 7,
    durationType: 0,
    durationTypeName: "Hours",
    adultPrice: 25,
    childPrice: 18,
    currencyName: "EUR",
    availabilityDayNo: EVERYDAY,
    isActive: true,
    description: `Immerse yourself in one of the world's premier underwater wonderlands on our Hurghada Scuba Diving Day Trip! Blessed with crystal-clear visibility exceeding 30 meters, warm waters, and vibrant marine biodiversity, the Red Sea is an undisputed bucket-list diving destination.

This tour welcomes both absolute beginners (Introductory Diving) and certified divers (PADI / SSI). Beginners receive a thorough, reassuring safety briefing and dive one-on-one with a dedicated dive instructor to safe depths up to 7–8 meters. Certified divers explore deeper drop-offs, pinnacles, and coral labyrinths under the guidance of our experienced divemaster.

Enjoy 2 separate boat dives at two distinct, pristine offshore reef locations. Between dives, relax on the spacious sun deck, take in coastal breezes, and savor a freshly prepared hot buffet lunch onboard with unlimited tea, coffee, and soft drinks. Non-diving companions are also welcome to join for a relaxing day of sunbathing and snorkeling.`,
    highlights: [
      "2 separate guided boat dives at two top-tier Red Sea coral reef dive sites",
      "Tailored for both first-time beginners (Intro Dives) and certified scuba divers",
      "1-on-1 personal instructor guidance for all introductory beginner divers",
      "Encounter spectacular marine life: sea turtles, rays, moray eels, and clownfish",
      "High-grade, professionally maintained scuba equipment (tanks, BCD, regulator, wetsuit, weights)",
      "Freshly prepared hot buffet lunch served onboard with free-flowing soft drinks",
      "Spacious yacht with shaded sundeck, indoor salon, and freshwater showers",
      "Round-trip hotel transfers in Hurghada included"
    ],
    includes: [
      "Round-trip air-conditioned hotel transfers in Hurghada",
      "Full-day luxury dive boat cruise",
      "2 guided dives at different reef locations",
      "Full scuba equipment rental (tanks, weights, BCD, regulator, wetsuit, mask, fins)",
      "Professional PADI/SSI certified dive instructor & divemaster",
      "Open-buffet lunch freshly cooked onboard",
      "Unlimited soft drinks, mineral water, tea, and coffee"
    ],
    excludes: [
      "Marine protectorate environmental fee ($5 / €5 per diver)",
      "Underwater photography and video services",
      "Tips for dive crew and instructors",
      "Hotel transfer surcharge outside central Hurghada"
    ],
    whatToBring: [
      "Swimwear and dry beach towel",
      "Dive certification card & logbook (for certified divers only)",
      "Passports for boat manifest registration",
      "Sunscreen and sunglasses",
      "Cash for marine reserve fee and tips"
    ]
  },

  "cairo": {
    name: "Cairo & Giza Pyramids Day Trip from Hurghada by Bus",
    destinationId: 5,
    destination: "Cairo",
    tripTypeId: 6,
    tripTypeName: "Culture excursions",
    timeFrom: "02:00:00",
    durationValue: 18,
    durationType: 0,
    durationTypeName: "Hours",
    adultPrice: 75,
    childPrice: 45,
    currencyName: "EUR",
    availabilityDayNo: EVERYDAY,
    isActive: true,
    description: `Journey from the Red Sea coast to the heart of ancient civilization on an awe-inspiring day trip to Cairo and the Giza Pyramids! Witness the only surviving wonder of the ancient world and uncover thousands of years of pharaonic history accompanied by an expert Egyptologist guide.

Departing from your Hurghada hotel in a comfortable, air-conditioned touring coach, you will travel along the scenic Red Sea coast before arriving in magnificent Cairo. Your historic exploration begins at the legendary Giza Plateau, where you stand in the shadow of the Great Pyramid of Khufu, Khafre, and Menkaure. Gaze upon the enigmatic Great Sphinx carved from solid bedrock and visit the Valley Temple of the mummification rituals.

Continue to central Cairo to tour the world-renowned Egyptian Antiquities Museum in Tahrir Square, home to an incomparable collection of over 120,000 pharaonic treasures, statues, and royal artifacts. Enjoy a delicious lunch at an oriental restaurant overlooking the Nile before shopping for authentic papyrus and perfumes, followed by a comfortable return drive to Hurghada.`,
    highlights: [
      "Stand in awe before the Great Pyramids of Giza (Khufu, Khafre, and Menkaure)",
      "Discover the mysterious Great Sphinx and the ancient Valley Temple of Khafre",
      "Panoramic viewpoint for breathtaking photos of all three Giza Pyramids together",
      "Guided tour of the world-famous Egyptian Museum in Cairo with certified Egyptologist",
      "Delicious lunch served at an oriental restaurant in Cairo",
      "Visit traditional papyrus institute and Egyptian perfume palace",
      "Comfortable long-distance transport in modern air-conditioned touring bus",
      "Round-trip hotel transfers from Hurghada included"
    ],
    includes: [
      "Round-trip transfers from Hurghada hotel in modern air-conditioned bus",
      "All entrance fees to the Giza Plateau and Egyptian Museum",
      "Professional licensed English-speaking Egyptologist tour guide",
      "Freshly prepared lunch at a local restaurant in Cairo",
      "Visit to Giza Pyramids, Sphinx, and Valley Temple",
      "Visit to the Egyptian Antiquities Museum"
    ],
    excludes: [
      "Entry ticket inside the Great Pyramid burial chamber (optional ticket at gate)",
      "Optional Nile Felucca sailing boat cruise in Cairo",
      "Beverages during restaurant lunch",
      "Personal souvenirs, tipping for guide and driver",
      "Transfer fee from distant resort zones"
    ],
    whatToBring: [
      "Original passport with Egyptian entry visa (mandatory for Cairo travel)",
      "Breakfast box ordered from your hotel reception the evening before",
      "Comfortable walking shoes and lightweight breathable clothes",
      "Sun protection: hat, sunglasses, and high-factor sunscreen",
      "Warm scarf or light jacket for air-conditioned bus ride",
      "Power bank for mobile phone / camera",
      "Cash in Egyptian Pounds / Euros for drinks and souvenirs"
    ]
  },

  "luxor_country": {
    name: "Luxor Day Tour from Hurghada: Valley of the Kings & Karnak",
    destinationId: 6,
    destination: "Luxor",
    tripTypeId: 6,
    tripTypeName: "Culture excursions",
    timeFrom: "04:30:00",
    durationValue: 16,
    durationType: 0,
    durationTypeName: "Hours",
    adultPrice: 65,
    childPrice: 40,
    currencyName: "EUR",
    availabilityDayNo: EVERYDAY,
    isActive: true,
    description: `Step into the world's greatest open-air museum on an unforgettable day tour to Luxor from Hurghada! Cross the Eastern Desert into the lush Nile Valley and walk among towering temples, monumental statues, and the vivid royal burial tombs of Egypt's greatest pharaohs with an expert Egyptologist guide.

On the West Bank of the Nile, explore the legendary Valley of the Kings, where New Kingdom pharaohs were buried in secret subterranean rock-cut tombs adorned with remarkably preserved colorful hieroglyphs. Marvel at the dramatic multi-tiered Mortuary Temple of Queen Hatshepsut nestled against the limestone cliffs of Deir el-Bahari, and pause before the towering Colossi of Memnon.

Cross the majestic River Nile to the East Bank for a delicious lunch at a local restaurant. The afternoon is dedicated to the colossal Karnak Temple Complex — the largest religious building ever constructed — where you will walk through the awe-inspiring Great Hypostyle Hall of 134 towering sandstone columns, the Sacred Lake, and ancient obelisks before returning comfortably to Hurghada.`,
    highlights: [
      "Explore 3 magnificent royal tombs inside the world-famous Valley of the Kings",
      "Marvel at the dramatic cliffside Mortuary Temple of Queen Hatshepsut",
      "Photo stop at the gigantic Colossi of Memnon statues of Amenhotep III",
      "Walk among the 134 colossal columns in the Great Hypostyle Hall of Karnak Temple",
      "Cross the historic River Nile by traditional boat",
      "Full guided tour led by a passionate, licensed Egyptologist guide",
      "Delicious lunch at a local restaurant included",
      "Round-trip hotel transfers in comfortable air-conditioned tourist vehicle"
    ],
    includes: [
      "Round-trip air-conditioned transport from Hurghada",
      "All standard monument entry tickets (Valley of the Kings, Hatshepsut Temple, Karnak Temple)",
      "Professional licensed English-speaking Egyptologist tour guide",
      "Scenic Nile River crossing by boat",
      "Delicious hot lunch at a local restaurant in Luxor",
      "Visit to traditional Luxor alabaster handcraft factory"
    ],
    excludes: [
      "Entry ticket to King Tutankhamun's tomb (optional add-on at gate)",
      "Optional banana island boat tour",
      "Drinks during restaurant lunch",
      "Personal gratuities for guide and driver",
      "Transfer surcharge from distant resort areas"
    ],
    whatToBring: [
      "Original passport for checkpoint verification",
      "Breakfast box (requested from hotel reception the night before)",
      "Comfortable sturdy walking shoes for temple exploration",
      "Lightweight cotton clothing, sun hat, and sunglasses",
      "Sunscreen and personal water bottle",
      "Camera / phone with ample battery and storage",
      "Cash for drinks, souvenirs, and tipping"
    ]
  }
};

function enrichAll() {
  console.log("Enriching all 15 trips in dataEntry/trips...");
  let count = 0;

  for (const [slug, data] of Object.entries(ENRICHED_DATA)) {
    const tripDir = path.join(TRIPS_DIR, slug);
    const jsonPath = path.join(tripDir, "trip.json");
    if (!fs.existsSync(jsonPath)) {
      console.warn(`Trip dir not found for ${slug}`);
      continue;
    }

    const existing = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    existing.name = {
      en: data.name,
      fr: data.name,
      ru: data.name,
      ro: data.name
    };

    existing.description = {
      en: data.description,
      fr: data.description,
      ru: data.description,
      ro: data.description
    };

    existing.highlights = data.highlights.map(h => ({ en: h, fr: h, ru: h, ro: h }));
    existing.includes = data.includes.map(i => ({ en: i, fr: i, ru: i, ro: i }));
    existing.excludes = data.excludes.map(e => ({ en: e, fr: e, ru: e, ro: e }));
    existing.whatToBring = data.whatToBring.map(w => ({ en: w, fr: w, ru: w, ro: w }));

    existing.destination = data.destination;
    existing.destinationId = data.destinationId;
    existing.tripTypeName = data.tripTypeName;
    existing.tripTypeId = data.tripTypeId;
    existing.timeFrom = data.timeFrom;
    existing.durationValue = data.durationValue;
    existing.durationType = data.durationType;
    existing.durationTypeName = data.durationTypeName;
    existing.adultPrice = data.adultPrice;
    existing.childPrice = data.childPrice;
    existing.currencyName = data.currencyName;
    existing.availabilityDayNo = data.availabilityDayNo;
    existing.isActive = data.isActive;

    existing._status = "curated";
    existing._missing = [];

    fs.writeFileSync(jsonPath, JSON.stringify(existing, null, 2) + "\n", "utf8");
    count++;
    console.log(`✓ Enriched ${slug} (${data.name})`);
  }

  console.log(`Successfully enriched ${count} trips!`);
}

enrichAll();


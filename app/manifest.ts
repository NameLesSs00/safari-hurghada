import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Safari Hurghada - Excursions & Desert Tours",
    short_name: "Safari Hurghada",
    description:
      "Safari Hurghada - #1 Rated Tour Operator in Hurghada. Best prices for VIP Desert Safaris, Quad Biking, Orange Bay Island, Submarine & Diving Excursions.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ea580c",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}


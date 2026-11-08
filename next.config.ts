import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  ...(process.env.STANDALONE === "true" ? { output: "standalone" as const } : {}),
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
      {
        source: "/destinations",
        destination: "/Destinations",
        permanent: false,
      },
      {
        source: "/:locale(en|de|fr|pl)/destinations",
        destination: "/:locale/Destinations",
        permanent: false,
      },
      {
        source: "/about",
        destination: "/About",
        permanent: false,
      },
      {
        source: "/:locale(en|de|fr|pl)/about",
        destination: "/:locale/About",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sunnytour.premiumasp.net",
        pathname: "/images/**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    qualities: [70],
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

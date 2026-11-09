import type { Metadata } from "next";
import { Montez, Roboto } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
import { ScrollToTop } from "@/src/components/scroll-to-top";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montez = Montez({
  variable: "--font-montez",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://safarihurghada.net"),
  title: "Safari Hurghada - Excursions & Desert Tours",
  description:
    "Safari Hurghada - #1 Rated Tour Operator in Hurghada. Book VIP Desert Safaris, Quad Biking, Orange Bay Island, Submarine & Diving Excursions at best prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${montez.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ScrollToTop />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

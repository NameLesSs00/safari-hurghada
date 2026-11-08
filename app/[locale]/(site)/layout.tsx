import { Footer } from "@/src/features/layout/footer/footer";
import { Header } from "@/src/features/layout/header/header";
import { WhatsAppButton } from "@/src/components/whatsapp-button";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main id="home" className="flex-1">
        {children}
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}

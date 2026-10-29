import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import ContactModal from "@/components/ContactModal";
import { Footer } from "@/components/sections";
import { agency } from "@/lib/content";
import "./globals.css";

// Display face: free stand-in for the museone logo's soft black italic serif. Swap via next/font/local if you license the original.
const display = Fraunces({ variable: "--font-display", style: "italic", axes: ["SOFT", "WONK"], subsets: ["latin"] });
const body = IBM_Plex_Sans({ variable: "--font-body", weight: ["400", "500", "600"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: `${agency.name} — ${agency.tagline}`, template: `%s — ${agency.name}` },
  description: agency.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Preloader />
        <Cursor />
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <ContactModal />
      </body>
    </html>
  );
}

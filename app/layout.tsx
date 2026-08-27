import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionRuntime from "@/components/MotionRuntime";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://voidworks.eu"),
  title: { default: "Voidworks — websites zonder bureauprijzen", template: "%s — Voidworks" },
  description: "Voidworks bouwt betaalbare websites op maat, met optionele hosting en onderhoud.",
  icons: { icon: "/logo.svg" },
  openGraph: { type: "website", locale: "nl_NL", siteName: "Voidworks" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="nl"><body><Navbar />{children}<Footer /><MotionRuntime /></body></html>;
}

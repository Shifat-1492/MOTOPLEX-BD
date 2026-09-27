import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MOTOPLEX BD | Official Importer of Aprilia, Vespa & Premium Motorcycling Gear",
  description: "Official Motoplex Bangladesh portal for Aprilia supersports, Vespa scooters, Shoei & AGV helmets, Dainese & Alpinestars riding gear, and Akrapovič racing exhausts.",
  keywords: ["Motoplex BD", "Aprilia RS 457 Bangladesh", "Vespa Bangladesh", "Shoei helmets Dhaka", "Dainese gear Bangladesh", "Motorcycle riding jacket BD"],
  openGraph: {
    title: "MOTOPLEX BD — Italian Racing & Luxury Two-Wheelers in Bangladesh",
    description: "Official importer and distributor of Aprilia, Vespa, Moto Guzzi, and FIM-certified gear.",
    type: "website",
    locale: "en_BD",
    siteName: "Motoplex Bangladesh",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 selection:bg-red-600 selection:text-white">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}

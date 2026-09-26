import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Wrap-Up | Your Weekend. Wrapped Perfectly.",
  description: "Discover affordable short trips designed for college and hostel students. Pick a destination, bring your squad, and make your weekend count.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-slate-900 bg-slate-50">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

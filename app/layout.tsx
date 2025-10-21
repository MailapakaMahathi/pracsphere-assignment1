import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ✅ Import your session wrapper component
import SessionProviderWrapper from "./SessionProviderWrapper";

// ✅ Fonts setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ SEO metadata (server-only)
export const metadata: Metadata = {
  title: "PracSphere",
  description: "AI-Powered ERP Task Management System",
};

// ✅ Root layout (server component)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Wrap all client-side components here */}
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}

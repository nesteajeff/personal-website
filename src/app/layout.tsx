import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NowPlayingProvider } from "../components/NowPlayingProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jeffrey Peng | Data Scientist",
  description:
    "Spotify-themed portfolio featuring projects, experience, and contact details.",
  icons: {
    icon: [
      { url: "/jeffrey.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/jeffrey.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NowPlayingProvider>{children}</NowPlayingProvider>
      </body>
    </html>
  );
}

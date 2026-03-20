import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kopi Nusantara — Roasteri Kopi Spesialti Indonesia",
  description:
    "Kopi Nusantara — Roasteri kopi spesialti Indonesia dari Yogyakarta. Nikmati kopi single-origin terbaik dari Toraja, Gayo, Kintamani, dan Flores.",
  keywords:
    "kopi, kopi nusantara, kopi spesialti, specialty coffee, kopi indonesia, roasteri yogyakarta, kopi toraja, kopi gayo",
  authors: [{ name: "Kopi Nusantara" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-body bg-coffee-900 text-cream overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

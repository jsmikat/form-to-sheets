import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import React from "react";

import { Toaster } from "sonner";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "700", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mridu's Canva",
  description: " Order procucts from Mridu's Canva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>"
        />
      
      </head>
      <body className={`${poppins.variable} antialiased`}>
        {children}
        <Toaster position="top-right" expand richColors closeButton />
      </body>
    </html>
  );
}

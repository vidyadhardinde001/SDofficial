import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Siddhivinayak Engineers",
  description: "Template created by Frontend Tribe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <head>
        <link rel="icon" href="/assets/Siddhivinayak-Engineers.ico" /> {/* Corrected path */}
        <title>Siddhivinyak Engineers</title>
        <meta name="description" content="Template created by Frontend Tribe" />
      </head>
      <body className={twMerge(outfit.className, "antialiased bg-[#EAEEFE]")}>
        {children}
      </body>
    </html>
  );
}

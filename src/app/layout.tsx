import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // Changed from Outfit to Montserrat
import "./globals.css";
import { twMerge } from "tailwind-merge";

// Configure Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Add the weights you want to use
});

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
        <link rel="icon" href="/assets/logo1.ico" />
        <title>Siddhivinayak Engineers</title>
        <meta name="description" content="Template created by Frontend Tribe" />
      </head>
      <body className={twMerge(montserrat.className, "antialiased bg-[#EAEEFE]")}>
        {children}
      </body>
    </html>
  );
}

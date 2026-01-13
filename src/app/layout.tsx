import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Anakupto 3D | Next-Gen Web Experiences",
  description: "Premium 3D Parallax Website built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis">
      <body className={`${outfit.variable} antialiased bg-background text-foreground`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

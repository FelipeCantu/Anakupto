import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { UIProvider } from "@/context/UIContext";
import { ContactDrawer } from "@/components/ui/ContactDrawer";
import { AuthProvider } from "@/context/AuthContext";

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
        <AuthProvider>
          <UIProvider>
            <Header />
            <ContactDrawer />
            <SmoothScroll>
              {children}
              <Footer />
            </SmoothScroll>
          </UIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

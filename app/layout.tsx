import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AuthProvider } from '../context/AuthContext';
import ResponsiveNavbar from "@/components/navBar";
import Footer from "@/components/footer";
import Scroll from "@/components/scroll";
import LayoutWrapper from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E.D.G.E",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <AuthProvider>
          <LayoutWrapper>
            {children}
            <Scroll />
          </LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
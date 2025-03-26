import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AuthProvider } from '../context/AuthContext';
import ResponsiveNavbar from "@/components/navBar";
import Footer from "@/components/footer";
import Scroll from "@/components/scroll"; 

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
          <ResponsiveNavbar />
          {children}
          <Scroll /> 
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
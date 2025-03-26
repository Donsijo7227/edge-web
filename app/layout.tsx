import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// import LayoutWrapper from "@/components/LayoutWrapper";
import { AuthProvider } from '../context/AuthContext';
import ResponsiveNavbar from "@/components/navBar";
import Footer from "@/components/footer";



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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <AuthProvider>
        {/* <LayoutWrapper> */}
        <ResponsiveNavbar/>
          {children}
          <Footer/>
          {/* </LayoutWrapper> */}
          </AuthProvider>

      </body>
    </html>
  );
}

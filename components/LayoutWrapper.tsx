"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navBar";
import Footer from "@/components/footer";

const noLayoutRoutes = ["/dashboard"]; // Add routes where Navbar/Footer should be hidden

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = noLayoutRoutes.includes(pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

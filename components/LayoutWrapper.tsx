"use client";

import { usePathname } from "next/navigation";
import ResponsiveNavbar from "@/components/navBar";
import Footer from "@/components/footer";

const noLayoutRoutes = ["/dashboard"]; // Add routes where Navbar/Footer should be hidden conditionally

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideLayout = noLayoutRoutes.includes(pathname);

    return (
        <>
            {!hideLayout && <ResponsiveNavbar />}
            {children}
            {!hideLayout && <Footer />}
        </>
    );
}
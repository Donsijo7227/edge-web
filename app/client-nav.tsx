'use client'

import { usePathname } from "next/navigation";
import ResponsiveNavbar from "@/components/navBar";
import Footer from "@/components/footer";
import Scroll from "@/components/scroll";

export default function ClientNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExceptionPage = pathname?.startsWith('/dashboard')|| pathname?.startsWith('/documentation')|| pathname?.startsWith('/users')|| pathname?.startsWith('/bursary-admin');

  if (isExceptionPage) {
    return <>{children}</>;
  }

  return (
    <>
      <ResponsiveNavbar />
      {children}
      <Scroll />
      <Footer />
    </>
  );
}
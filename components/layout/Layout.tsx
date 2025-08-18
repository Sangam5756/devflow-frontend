"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = ["/login", "/signup"].includes(pathname);
  return (
    <div className="min-h-screen flex flex-col">
      <SessionProvider>
        {!hideLayout && <Navbar />}
        <main className="flex-1">{children}</main>
        {!hideLayout && <Footer />}
      </SessionProvider>
    </div>
  );
}

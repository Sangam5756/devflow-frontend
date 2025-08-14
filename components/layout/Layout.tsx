"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function LayoutClient({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const pathname = usePathname();
  const hideLayout = ["/login", "/signup"].includes(pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <SessionProvider>
        {!hideLayout && <Navbar session={session} />}
        <main className="flex-1">{children}</main>
        {!hideLayout && <Footer />}
      </SessionProvider>
    </div>
  );
}

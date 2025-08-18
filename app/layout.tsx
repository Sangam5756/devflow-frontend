import type { Metadata } from "next";
import "./globals.css";
import Providers from "./provider";
import LayoutClient from "@/components/layout/Layout";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "DEV",
  description: "question and answer platform for developers",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className="bg-[#030711] text-[#D1D5DB]">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="min-h-screen flex  flex-col">
          <Providers>
            <LayoutClient >{children}</LayoutClient>
          </Providers>
        </div>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

import {
  MessageCircleQuestion,
  User,
  Settings,
  LogOut,
  Search,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import NavButton from "./ui/Button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const session = useSession();
  const isAuthenticated = session?.status === "authenticated";
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <nav className="w-full px-4 border-b border-gray-700 py-4 bg-[#030711] ">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left - Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 font-bold text-xl"
        >
          <div className="w-8 h-8 bg-[#5d8bf0] rounded-lg flex items-center justify-center">
            <span className="text-black font-bold">D</span>
          </div>
          <span className="text-[#6893f1]">DevFlow</span>
        </Link>

        {/* Desktop Search */}
        {isAuthenticated && (
          <div className="w-full max-w-md mx-6 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0B8D4] h-4 w-4" />
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full rounded-md bg-[#1A2035] text-[#B0B8D4] placeholder-[#B0B8D4] text-sm px-4 py-2 pl-10 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-2 text-white">
          {isAuthenticated ? (
            <>
              <NavButton
                href="/ask"
                icon={MessageCircleQuestion}
                text="Ask Question"
              />
              <NavButton
                href={`/profile/${session?.data?.user?.name}`}
                icon={User}
              />
              <NavButton href="/settings" icon={Settings} />
              <NavButton
                onClick={() => signOut({ callbackUrl: "/" })}
                icon={LogOut}
                className="text-red-400 cursor-pointer hover:text-red-600"
              />
            </>
          ) : (
            <>
              <NavButton
                href={`/login?callbackUrl=${pathname}`}
                icon={LogIn}
                text="Login"
              />
              <Link href="/register">
                <span className="bg-[#5284ef] ml-2 text-black px-4 py-2 rounded-md font-semibold hover:bg-[#3a54d1] transition cursor-pointer">
                  Sign Up
                </span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="md:hidden text-white"
        >
          {drawerOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Drawer (Animated) */}
      <div
        className={`
    fixed top-0 left-0 h-full w-64 z-50 bg-[#0d1327] border-r border-[#1F2937] shadow-lg p-6
    transition-transform duration-300 ease-in-out
    ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
    md:hidden
  `}
      >
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button onClick={() => setDrawerOpen(false)}>
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Mobile Search */}
        {isAuthenticated && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0B8D4] h-4 w-4" />
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full rounded-md bg-[#1A2035] text-[#B0B8D4] placeholder-[#B0B8D4] text-sm px-4 py-2 pl-10 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Drawer Nav */}
        <div className="flex flex-col gap-3 text-white">
          {isAuthenticated ? (
            <div
              className=" flex flex-col"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <NavButton
                href="/ask"
                icon={MessageCircleQuestion}
                text="Ask Question"
                onClick={() => setDrawerOpen(!drawerOpen)}
              />
              <NavButton
                href={`/profile/${session?.data?.user?.name}`}
                onClick={() => setDrawerOpen(!drawerOpen)}
                icon={User}
                text="Profile"
              />
              <NavButton
                href="/settings"
                icon={Settings}
                text="Settings"
                onClick={() => setDrawerOpen(!drawerOpen)}
              />
              <NavButton
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setDrawerOpen(false);
                }}
                icon={LogOut}
                text="Logout"
                className="text-red-400 hover:text-red-600"
              />
            </div>
          ) : (
            <>
              <Link
                onClick={() => setDrawerOpen(false)}
                href={`/login?callbackUrl=${pathname}`}
                className="w-full"
              >
                <span className="block w-full text-center bg-[#1A2035] border border-[#2D3748] text-white py-2 rounded-md text-sm font-semibold hover:bg-[#9b6af1] hover:text-black transition">
                  Login
                </span>
              </Link>
              <Link
                onClick={() => setDrawerOpen(false)}
                href="/register"
                className="w-full"
              >
                <span className="block w-full text-center bg-[#5284ef] text-black py-2 rounded-md text-sm font-semibold hover:bg-[#3a54d1] transition">
                  Sign Up
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

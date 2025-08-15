"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("sangammunde3@gmail.com");
  const [password, setPassword] = useState("pass@123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackurl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: callbackUrl,
      redirect: false,
    });

    setIsLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Login successful!");

      window.location.href = callbackUrl;
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(decodeURIComponent(error));
    }
  }, [error]);

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to DevFlow
        </Link>

        {/* Card container */}
        <div className="bg-[#070b1a] rounded-xl shadow-lg p-4 animate-[scale-in_0.2s_ease-out]">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[#4a7de6] to-[#5a8bf6] rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-black font-bold text-xl">D</span>
            </div>
            <h1 className="text-2xl text-white font-semibold">Welcome back</h1>
            <p className="text-gray-400 text-sm">
              Sign in to your DevFlow account to continue learning
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2 mt-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-white text-sm font-semibold"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0a0f22] border border-[#1f2a44] rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5a8bf6]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-white text-sm font-semibold"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#0a0f22] border border-[#1f2a44] rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5a8bf6]"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link
                href="/forgot-password"
                className="text-[#3b6ef6] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5a8bf6] hover:bg-[#4a7de6] text-black font-medium rounded-lg py-3 transition-colors"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full bg-[#ffffff1a] hover:bg-[#ffffff33] text-white font-medium rounded-lg py-3 mt-4 transition-colors"
          >
            Sign in with Google
          </button>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-400">Don t have an account? </span>
            <Link
              href="/register"
              className="text-[#3b6ef6] hover:underline font-semibold"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

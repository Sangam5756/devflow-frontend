import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <>
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-lg text-[#9CA3AF] mb-8">
            Join thousands of developers who are already helping each other
            succeed.
          </p>
          <Link href="/register">
            <span className="bg-[#4B6CF7] text-black font-semibold px-6 py-2 rounded-md inline-flex items-center gap-2 hover:bg-[#3a54d1] transition cursor-pointer">
              Join DevFlow Today <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}

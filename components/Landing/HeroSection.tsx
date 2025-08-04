import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const tags = [
    "JavaScript",
    "React",
    "TypeScript",
    "Python",
    "Next.js",
    "Node.js",
    "CSS",
    "HTML",
  ];
  return (
    <>
      <section className="container mx-auto px-4 py-20 text-center animate-fade-in-up">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ask. Answer. Learn.
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A platform where developers help each other grow through meaningful
            questions, detailed answers, and collaborative learning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register" className="w-full sm:w-auto">
              <span className="w-full sm:w-auto bg-[#5284ef] group text-black  text-base font-medium px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-[#7572fff8] transition cursor-pointer">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/feed" className="w-full sm:w-auto">
              <span className="w-full sm:w-auto border border-[#1F2937] font-semibold text-white text-base bg-[#030711] px-6 py-3 rounded-md flex items-center justify-center hover:bg-[#9b6af1] transition cursor-pointer">
                Browse Questions
              </span>
            </Link>
          </div>

          <p className="text-muted-foreground text-sm mb-4 select-none">
            Popular technologies:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#1F2937] text-white text-xs font-semibold rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

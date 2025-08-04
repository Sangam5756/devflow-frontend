import { Code2, Globe } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="border-t border-[#1F2937] py-8">
        <div className="container mx-auto px-4 text-center text-sm text-[#9CA3AF]">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code2 className="h-4 w-4" />
            <span>Built with ❤️ for developers</span>
            <Globe className="h-4 w-4" />
          </div>
          <p>
            &copy; {new Date().getFullYear()} DevFlow. Empowering developers
            worldwide.
          </p>
        </div>
      </footer>
    </>
  );
}

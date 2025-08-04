import Link from "next/link";
import { cn } from "@/lib/utils"; // Optional utility to merge Tailwind classes
import { ComponentType, MouseEventHandler } from "react";

interface NavButtonProps {
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ComponentType<{ className?: string }>;
  text?: string;
  className?: string;
}
export default function NavButton({
  href,
  onClick,
  icon: Icon,
  text,
  className = "",
}: NavButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-xl hover:bg-[#9b6af1] transition hover:text-black";

  const content = (
    <span className={cn(baseClasses, className)}>
      {Icon && <Icon className="h-4 w-4 mr-1" />}
      {text}
    </span>
  );

  return href ? (
    <Link href={href}>{content}</Link>
  ) : (
    <button onClick={onClick}>{content}</button>
  );
}

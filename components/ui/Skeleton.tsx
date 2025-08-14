import React from "react";
import { cn } from "@/lib/utils"; // remove or adjust if you don't have a cn() helper

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-700", // Tailwind shimmer look
        className
      )}
      {...props}
    />
  );
}

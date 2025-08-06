'use client'

import { LucideIcon } from "lucide-react"

type TabButtonProps = {
  value: string
  icon: LucideIcon
  label: string
  activeTab: string
  setActiveTab: (value: string) => void
}

export default function TabButton({
  value,
  icon: Icon,
  label,
  activeTab,
  setActiveTab,
}: TabButtonProps) {
  const isActive = activeTab === value

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`flex items-center justify-center cursor-pointer gap-2 rounded-2xl px-4 py-2 w-full text-sm font-medium transition-colors
        ${
          isActive
            ? "bg-[#030711]  text-white"
            : "text-gray-400  hover:text-white"
        }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  )
}

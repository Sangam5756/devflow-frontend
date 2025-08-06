'use client'
import { TrendingUp } from "lucide-react"

type TrendingTagsProps = {
  tags: string[]
}

export default function TrendingTags({ tags }: TrendingTagsProps) {
  return (
    <div className="bg-[#111827] p-4 rounded-md">
      <h3 className="font-semibold text-white mb-3 flex items-center">
        <TrendingUp className="w-4 h-4 mr-2 text-blue-400" />
        Trending Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-full cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

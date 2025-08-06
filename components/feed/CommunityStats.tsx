'use client'

type CommunityStatsProps = {
  questionsToday: number
  answersPosted: number
  activeMembers: number
}

export default function CommunityStats({
  questionsToday,
  answersPosted,
  activeMembers,
}: CommunityStatsProps) {
  return (
    <div className="bg-[#111827] p-4 rounded-md">
      <h3 className="font-semibold mb-3">Community Stats</h3>
      <div className="space-y-2 text-sm text-gray-300">
        <div className="flex justify-between">
          <span>Questions Today</span>
          <span className="font-semibold text-white">{questionsToday}</span>
        </div>
        <div className="flex justify-between">
          <span>Answers Posted</span>
          <span className="font-semibold text-white">{answersPosted}</span>
        </div>
        <div className="flex justify-between">
          <span>Active Members</span>
          <span className="font-semibold text-white">{activeMembers}</span>
        </div>
      </div>
    </div>
  )
}

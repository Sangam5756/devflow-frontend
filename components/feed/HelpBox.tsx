'use client'

export default function HelpBox() {
  return (
    <div className="bg-blue-600 p-4 rounded-lg text-white">
      <h3 className="font-semibold mb-1">New to DevFlow?</h3>
      <p className="text-sm opacity-90 mb-4">
        Learn how to ask great questions and contribute to the community.
      </p>
      <button className="bg-white text-blue-600 w-full py-2 text-sm font-semibold rounded-md hover:bg-gray-200">
        View Guidelines
      </button>
    </div>
  )
}

"use client";
import { Skeleton } from "./ui/Skeleton";

export default function Loader() {
  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;3
          }
        }
        .shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>

      <div className="w-full bg-gray-900 text-white">
        {/* Question Cards */}
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="bg-gray-800 rounded-lg p-4 mb-4 mx-4 h-[193px]"
          >
            <div className="flex items-start space-x-4 h-full">
              <div className="w-10 h-10 bg-gray-600 rounded-full shimmer flex-shrink-0"></div>

              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="h-4 w-20 bg-gray-600 rounded shimmer"></div>
                    <div className="h-4 w-16 bg-gray-600 rounded shimmer"></div>
                  </div>

                  {/* Question Title */}
                  <div className="h-6 w-full bg-gray-600 rounded shimmer mb-3"></div>

                  {/* Question Description */}
                  <div className="h-4 w-full bg-gray-600 rounded shimmer mb-2"></div>
                  <div className="h-4 w-3/4 bg-gray-600 rounded shimmer mb-4"></div>
                </div>

                {/* Bottom Section */}
                <div>
                  {/* Tags */}
                  <div className="flex gap-2 mb-3">
                    <div className="h-5 w-12 bg-gray-600 rounded shimmer"></div>
                    <div className="h-5 w-16 bg-gray-600 rounded shimmer"></div>
                    <div className="h-5 w-14 bg-gray-600 rounded shimmer"></div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-600 rounded shimmer"></div>
                        <div className="h-4 w-4 bg-gray-600 rounded shimmer"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-600 rounded shimmer"></div>
                        <div className="h-4 w-4 bg-gray-600 rounded shimmer"></div>
                      </div>
                    </div>
                    <div className="h-4 w-16 bg-gray-600 rounded shimmer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

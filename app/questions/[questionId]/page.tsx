import { ArrowLeft, Clock, Heart, Share2, MessageCircle } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "@/constants/api";
import { formatDistanceToNow } from "date-fns";

async function slugToId(slug: string) {
  return slug.split("-").pop() || "";
}

type Author = {
  username: string;
};

type Answer = {
  id: string;
  content: string;
  author: Author;
  likes: number;
  timestamp: string;
  isLiked: boolean;
  isOwner: boolean;
};

type QuestionData = {
  id: string;
  title: string;
  content: string;
  author: Author;
  likes: number;
  answer: number;
  timestamp: string;
  isLiked: boolean;
  isOwner: boolean;
  answers: Answer[];
};

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ questionId: string }>;
}) {

  const resolvedParams = await params;
  const id = await slugToId(resolvedParams.questionId);

  let questionData: QuestionData | null = null;
  try {
    const res = await axios.get(`${API_URL}/question/${id}`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    questionData = res.data.data;
  } catch (error) {
    console.error("Failed to fetch question data", error);
  }

  if (!questionData) {
    return (
      <div className="min-h-screen ">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full  flex items-center justify-center">
              <MessageCircle className="w-12 h-12 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Question Not Found
            </h1>
            <p className="text-slate-400 mb-8">
              The question you are looking for does not exist or failed to load.
            </p>
            <Link
              href="/feed"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Feed
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/feed"
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-200 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back to Feed</span>
        </Link>

        {/* Question Card */}
        <div className=" rounded-2xl border border-gray-900 p-8 mb-8 shadow-2xl">
          {/* Question Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#1f2937] flex items-center justify-center shadow-lg">
                  <span className="font-bold text-white text-lg">
                    {questionData?.author?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* User Info */}
              <div>
                <h3 className="text-white font-semibold text-lg">
                  {questionData?.author?.username}
                </h3>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>
                    {formatDistanceToNow(new Date(questionData.timestamp), {
                      addSuffix: true,
                    }).replace(/about\s/, "")}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors group">
                <Heart
                  className={`w-5 h-5 transition-all ${
                    questionData.isLiked
                      ? "fill-red-500 text-red-500 scale-110"
                      : "text-slate-400 group-hover:text-red-400 group-hover:scale-110"
                  }`}
                />
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors group">
                <Share2 className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
              </button>
            </div>
          </div>

          {/* Question Content */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-white leading-tight">
              {questionData.title}
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              {questionData.content}
            </p>
          </div>

          {/* Question Stats */}
          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-slate-600/30">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300 font-medium">
                {questionData.answer} Answer
                {questionData.answer !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="text-slate-300 font-medium">
                {questionData.likes} Like{questionData.likes !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className="space-y-6">
          {questionData.answer === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full  flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-400 text-lg font-medium mb-2">
                No answers yet
              </p>
              <p className="text-slate-500">
                Be the first to share your knowledge!
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-blue-400" />
                Answers ({questionData.answer})
              </h2>

              {questionData.answers?.map((ans) => {
                // Function to format code blocks in content
                const formatContent = (content: string) => {
                  const parts = content.split(
                    /(\n\n[a-zA-Z_$][a-zA-Z0-9_$]*\([\s\S]*?\n\n)/g
                  );

                  return parts.map((part, partIndex) => {
                    // Check if this part looks like code (contains function definitions, brackets, etc.)
                    const isCodeBlock =
                      part.includes("function ") ||
                      part.includes("const ") ||
                      part.includes("let ") ||
                      part.includes("var ") ||
                      part.match(/\n\s*[{}]/g) ||
                      part.includes("console.log") ||
                      part.includes("return ");

                    if (isCodeBlock && part.trim()) {
                      return (
                        <div
                          key={partIndex}
                          className="my-4 bg-slate-900/50 border border-slate-600/30 rounded-lg p-4 font-mono text-sm overflow-x-auto"
                        >
                          <pre className="text-slate-200 whitespace-pre-wrap">
                            <code>{part.trim()}</code>
                          </pre>
                        </div>
                      );
                    }

                    return (
                      <span key={partIndex} className="whitespace-pre-wrap">
                        {part}
                      </span>
                    );
                  });
                };

                return (
                  <div
                    key={ans.id}
                    className="border rounded-xl p-6 hover:border-slate-500/30 transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#1f2937] flex items-center justify-center flex-shrink-0">
                        <span className="font-semibold text-white text-sm">
                          {ans.author.username.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-semibold text-white">
                            @{ans.author.username}
                          </span>
                          <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                          <span className="text-slate-400 text-sm">
                            {formatDistanceToNow(new Date(ans.timestamp), {
                              addSuffix: true,
                            }).replace(/about\s/, "")}
                          </span>
                        </div>

                        <div className="text-slate-200 leading-relaxed mb-4">
                          {formatContent(ans.content)}
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <button className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors group">
                            <Heart
                              className={`w-4 h-4 group-hover:scale-110 transition-transform ${
                                ans.isLiked ? "fill-red-500 text-red-500" : ""
                              }`}
                            />
                            <span>{ans.likes}</span>
                          </button>
                          <button className="text-slate-400 hover:text-blue-400 transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        

        {/* Add Answer Section */}
        <div className="mt-12  border border-slate-600/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Your Answer</h3>
          <textarea
            className="w-full h-32 bg-slate-800/50 border border-slate-600/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
            placeholder="Share your knowledge and help others..."
          />
          <div className="flex justify-end mt-4">
            <button className=" bg-blue-950 hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
              Post Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

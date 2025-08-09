import { ArrowLeft, Clock, Heart, Share2 } from "lucide-react";
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
  likes?: number;
  timestamp?: string;
  isLiked?: boolean;
  isOwner?: boolean;
};

type QuestionData = {
  id: string;
  title: string;
  content: string;
  author: Author;
  likes?: number;
  answer: number;
  timestamp?: string | number;
  isLiked?: boolean;
  isOwner?: boolean;
  answers: Answer[];
};

export default async function QuestionDetailPage({
  params,
}: {
  params: { questionId: string };
}) {
  const id = await slugToId(params.questionId);

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
      <div className="container mx-auto px-4 py-8 max-w-4xl text-white">
        <p>Question not found or failed to load.</p>
        <Link href="/feed" className="text-blue-500 underline">
          Back to Feed
        </Link>
      </div>
    );
  }

  console.log(questionData);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/feed"
        className="flex gap-2 py-2 rounded-md hover:bg-[#9b6af1] w-fit mb-10 cursor-pointer duration-200 hover:text-black px-2 items-center"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Feed</span>
      </Link>

      {/* this section is for question */}
      <div className="flex border p-4 border-gray-800 mb-2 flex-col gap-4">
        <div className=" items-center gap-2 text-xs text-gray-400 space-x-2">
          
          {/* question section */}
          <div className="flex  justify-between">
            {/* left part of question  */}
            <div className="flex gap-2 items-center">
              {/* username and logo */}
              <div className="flex items-center">
                {/* avatar */}
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0c162f] text-[#5284ef]">
                  <span className="font-medium text-lg">
                    {questionData?.author?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              {/* username and date */}
              <div className="flex flex-col ">
                <span className="  text-white text-sm  font-medium">
                  {questionData?.author?.username}
                </span>
                <div className="flex text-md mt-1 font-medium items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>
                    {formatDistanceToNow(
                      new Date(questionData?.timestamp || ""),
                      {
                        addSuffix: true,
                      }
                    ).replace(/about\s/, "")}
                  </span>
                </div>
              </div>
            </div>

            {/* right part of question*/}
            <div className="flex text-lg">
              <Heart
                className={`h-4 w-4 mr-1 ${
                  questionData.isLiked ? "fill-current text-red-500" : ""
                }`}
              />
               <Share2 className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/*  question title section  */}
        <div>
          <h1 className="text-white font-semibold text-lg mb-3 leading-tight">
            {questionData?.title}
          </h1>
          <p className="mb-6 text-sm text-[#8B949E]">{questionData?.content}</p>

          <h2 className="text-white font-semibold mb-3">
            {questionData?.answer} Answer{questionData?.answer !== 1 ? "s" : ""}
          </h2>
        </div>
      </div>

      {/* when no answer is there */}
      {questionData?.answer === 0 && (
        <p className="text-[#8B949E] text-sm">
          No answers yet. Be the first to answer!
        </p>
      )}

      {/* this section is for the answers of all question */}
      {questionData?.answers?.map((ans) => (
        <div
          key={ans.id}
          className="bg-[#0D111C] p-4 rounded-md mb-3 text-[#C9D1D9]"
        >
          <p className="whitespace-pre-wrap">{ans?.content}</p>
          <p className="mt-2 text-xs text-[#8B949E]">
            — @{ans?.author?.username}
          </p>
        </div>
      ))}
    </div>
  );
}

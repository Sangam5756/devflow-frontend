import { API_URL } from "@/constants/api";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

async function slugToId(slug: string) {
  return slug.split("-").pop() || "";
}

type Question = {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
};

type Answer = {
  _id: string;
  answer: string;
  createdAt: string;
  user?: { name: string };
};

export default async function QuestionDetailPage({
  params,
}: {
  params: { questionId: string };
}) {
  const id = await slugToId(params.questionId);
  console.log(id);

  // fetch the question
  const questionResponse = await axios.get(API_URL + "/question/" + id, {
    headers: {
      cache: "no-store",
    },
  });
  console.log(questionResponse.data.data);
  // fetch the answer
  const answerResponse = await axios.get(API_URL + "/answer/question/" + id, {
    headers: {
      cache: "no-store",
    },
  });
  console.log(answerResponse.data.data);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* back to feed buttonn */}

      <Link
        href="/feed"
        className="flex gap-2  py-2 rounded-md hover:bg-[#9b6af1] w-fit mb-10 cursor-pointer duration-200 hover:text-black px-2 items-center"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Feed</span>
      </Link>

      <h1 className="text-white font-semibold text-lg mb-3 leading-tight">
        {questionResponse.data.data[0].title}
      </h1>
      <p className="mb-6 text-sm text-[#8B949E]">
        {questionResponse.data.data[0].body}
      </p>

      {/* Answers */}
      <h2 className="text-white font-semibold mb-3">
        {answerResponse.data.data.length} Answers
      </h2>
      {answerResponse.data.data.length === 0 && (
        <p className="text-[#8B949E] text-sm">
          No answers yet. Be the first to answer!
        </p>
      )}
      {answerResponse.data.data.map((ans: any) => (
        <div
          key={ans._id}
          className="bg-[#0D111C] p-4 rounded-md mb-3 text-[#C9D1D9]"
        >
          {ans.answer}
        </div>
      ))}
    </div>
  );
}

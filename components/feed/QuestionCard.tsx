"use client";
import { Heart, MessageCircle, ArrowRight, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { likeTarget } from "@/actions/likes";
type QuestionCardProps = {
  _id:string,
  title: string;
  body: string;
  userId: { _id: string; username: string };
  topics: string[];
  likes: number;
  dislikes: number;
  replies: number;
  createdAt: string;
  isLike: boolean;
};

function slugify(title:string) {
  return title
    .toString() // ensure string
    .normalize("NFD") // handle accents like é -> e
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces -> dash
    .replace(/-+/g, "-"); // collapse multiple dashes
}
export default function QuestionCard({
  _id,
  title,
  body,
  userId,
  topics,
  likes,
  replies,
  createdAt,
  isLike,
}: QuestionCardProps) {
  return (
    <div className="bg-[#040a1a] border-1  border-gray-800 hover:shadow-gray-500 shadow duration-200 rounded-md p-4 space-y-3 text-white">
      <div className="flex items-center gap-2 text-xs text-gray-400 space-x-2">
        {/* username and logo */}
        <div className="flex items-center">
          {/* avatar */}
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0c162f] text-[#5284ef]">
            <span className="font-medium text-lg">
              {userId.username.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        {/* username and date */}
        <div className="flex flex-col ">
          <span className="  text-white text-sm  font-medium">
            {userId.username}
          </span>
          <div className="flex text-md font-medium items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>
              {formatDistanceToNow(new Date(createdAt), {
                addSuffix: true,
              }).replace(/about\s/, "")}
            </span>
          </div>
        </div>
      </div>


      {/* title */}
      <Link href={`/questions/${slugify(title)}-${_id}`} className="font-semibold text-lg">{title}</Link>
      {/* content */}
      <p className="text-gray-400 text-sm">{body}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {topics.map((tag: string) => (
          <span
            key={tag}
            className="bg-[#1f2937] capitalize font-semibold  text-gray-200 text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* likes and replies count show */}
      <div className="flex items-center text-gray-400 text-xs mt-2">
        {/* likes */}
        <div className="flex items-center cursor-pointer  hover:bg-slate-800 mr-4">
          <Heart onClick={()=>likeTarget(_id,'Question')}
            className={`w-4 h-4 mr-1 transition-colors  duration-300 cursor-pointer ${
              isLike ? "text-pink-500 fill-pink-500" : "text-gray-700"
            }`}
          />
          <span className="text-base">{likes}</span>
        </div>
        {/* replies */}
        <div className="flex cursor-pointer items-center text-base gap-2">
          <MessageCircle className="w-4 h-4" />
          {replies}
        </div>


        {/* readme more button */}
        <Link href={`/questions/${slugify(title)}-${_id}`} className="ml-auto flex items-center text-blue-500 rounded-md duration-100 px-2 py-2 hover:text-white hover:bg-blue-900 cursor-pointer text-base">
          Read more
          <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>
    </div>
  );
}

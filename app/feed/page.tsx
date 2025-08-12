"use client";

import {  useState } from "react";
import { Plus, Clock, TrendingUp, MessageCircleQuestion } from "lucide-react";

import TabButton from "@/components/feed/TabButton";
import QuestionCard from "@/components/feed/QuestionCard";
import { useQuery } from "@tanstack/react-query";
import TrendingTags from "@/components/feed/TrendingTags";
import CommunityStats from "@/components/feed/CommunityStats";
import HelpBox from "@/components/feed/HelpBox";
import axios from "axios";
import { API_URL } from "@/constants/api";
type QuestionType = {
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

async function fetchFeed() {
  const res = await axios.get(API_URL + "/feed/public");
  return res.data.data;
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("latest");
  const {data:questions=[]} =useQuery({
    queryKey:['feed'],
    queryFn:fetchFeed,
    staleTime:1000*60*5
  })


  const filteredQuestions = () => {
    if (activeTab === "trending")
      return questions.filter((q:QuestionType) => q.likes > 1);
    if (activeTab === "unanswered")
      return questions.filter((q:QuestionType) => q.replies === 0);
    return questions;
  };

  const trendingTags = [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Python",
    "JavaScript",
    "Vue.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
  ];


  return (
    <div className="min-h-screen bg-[#030711] text-white px-4 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            {/* Left Section */}
            <div className="sm:max-w-md">
              <h1 className="text-2xl font-bold">Developer Questions</h1>
              <p className="text-gray-400">
                Discover and answer questions from the community
              </p>
            </div>

            {/* Right Section - Button */}
            <button className="flex-shrink-0 flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm whitespace-nowrap">
              <Plus className="w-4 h-4 mr-2" />
              Ask Question
            </button>
          </div>

          {/* Tabs */}
          <div className="flex p-1 bg-[#1f2937] rounded-2xl overflow-hidden mb-6">
            <TabButton
              value="latest"
              icon={Clock}
              label="Latest"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabButton
              value="trending"
              icon={TrendingUp}
              label="Trending"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabButton
              value="unanswered"
              icon={MessageCircleQuestion}
              label="Unanswered"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          <div className="space-y-4">
            {filteredQuestions().length ? (
              filteredQuestions().map((question:QuestionType) => (
                <QuestionCard key={question._id} {...question} />
              ))
            ) : (
              <div className="text-center py-10 text-gray-400">
                <MessageCircleQuestion className="w-10 h-10 mx-auto mb-3" />
                <p>All questions have been answered! 🎉</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <TrendingTags tags={trendingTags} />
          <CommunityStats
            questionsToday={2}
            answersPosted={100}
            activeMembers={100}
          />
          <HelpBox />
        </div>
      </div>
    </div>
  );
}

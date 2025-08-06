"use client";

import { useState } from "react";
import { Plus, Clock, TrendingUp, MessageCircleQuestion } from "lucide-react";

import TabButton from "@/components/feed/TabButton";
import QuestionCard from "@/components/feed/QuestionCard";
import TrendingTags from "@/components/feed/TrendingTags";
import CommunityStats from "@/components/feed/CommunityStats";
import HelpBox from "@/components/feed/HelpBox";

const mockQuestions = [
  {
    _id: "6892dbea95da3adc05bf19ae",
    title: "How to implement pagination in MongoDB?",
    body: "Can anyone share how to paginate data efficiently using skip and limit?",
    topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "6881c40ad0390e869ced1646",
      username: "parmsdev",
    },
    createdAt: "2025-08-06T04:36:58.083Z",
    updatedAt: "2025-08-06T04:36:58.083Z",
    __v: 0,
    likes: 2,
    dislikes: 0,
    isLike:true,
    replies: 3,
  },
  {
    _id: "6892dbe195da3adc05bf19ab",
    title: "What is memoization in React?",
    body: "I’ve read about memoization, but when should I use React.memo or useMemo?",
    topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "6881c40ad0390e869ced1646",
      username: "parmsdev",
    },
    createdAt: "2025-08-06T04:36:49.876Z",
    updatedAt: "2025-08-06T04:36:49.876Z",
    __v: 0,
    likes: 0,
    dislikes: 0,
    replies: 3,isLike:true,
  },
  {
    _id: "6892dbda95da3adc05bf19a8",
    title: "How to handle errors globally in Express.js?",
    body: "Is there a clean way to manage errors across the entire backend?",
   topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "6881c40ad0390e869ced1646",
      username: "parmsdev",
    },
    createdAt: "2025-08-06T04:36:42.776Z",
    updatedAt: "2025-08-06T04:36:42.776Z",
    __v: 0,
    likes: 0,
    dislikes: 0,
    replies: 3,isLike:true,
  },
  {
    _id: "6892dbce95da3adc05bf19a5",
    title: "What is React Query used for?",
    body: "How does React Query help in fetching data and managing cache in React apps?",
    topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "6881c40ad0390e869ced1646",
      username: "parmsdev",
    },
    createdAt: "2025-08-06T04:36:30.111Z",
    updatedAt: "2025-08-06T04:36:30.111Z",
    __v: 0,
    likes: 0,
    dislikes: 0,
    replies: 3,
    isLike:false,
  },
  {
    _id: "6892dba995da3adc05bf199b",
    title: "What are environment variables in Node.js?",
    body: "Why do we use .env files and how are environment variables accessed?",
    topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "6881c40ad0390e869ced1646",
      username: "parmsdev",
    },
    createdAt: "2025-08-06T04:35:53.889Z",
    updatedAt: "2025-08-06T04:35:53.889Z",
    __v: 0,
    likes: 0,
    dislikes: 0,
    replies: 3,
        isLike:false,

  },
  {
    _id: "6892dba395da3adc05bf1998",
    title: "How to deploy a Node.js app on Render?",
    body: "Can someone guide me through deploying a Node.js backend to Render.com?",
   topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "6881c40ad0390e869ced1646",
      username: "parmsdev",
    },
    createdAt: "2025-08-06T04:35:47.547Z",
    updatedAt: "2025-08-06T04:35:47.547Z",
    __v: 0,
    likes: 0,
    dislikes: 0,
    replies: 3,
        isLike:false,

  },
  {
    _id: "6892db9995da3adc05bf1995",
    title: "How does async/await work in Node.js?",
    body: "Can someone explain async/await with a simple example and how it's better than promises?",
   topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "6881c40ad0390e869ced1646",
      username: "parmsdev",
    },
    createdAt: "2025-08-06T04:35:37.407Z",
    updatedAt: "2025-08-06T04:35:37.407Z",
    __v: 0,
    likes: 0,
    dislikes: 0,
    replies: 3,
        isLike:true,

  },
  {
    _id: "6892db8e95da3adc05bf1992",
    title: "What is the use of useMemo in React?",
    body: "When should I use useMemo and what problems does it solve?",
    topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "6881c40ad0390e869ced1646",
      username: "parmsdev",
    },
    createdAt: "2025-08-06T04:35:26.541Z",
    updatedAt: "2025-08-06T04:35:26.541Z",
    __v: 0,
    likes: 0,
    dislikes: 0,
    replies: 3,    isLike:false,

  },
  {
    _id: "6892daca95da3adc05bf1987",
    title: "What is CORS and how to fix it?",
    body: "Why do I get CORS errors in frontend requests and how do I solve them in Express backend?",
   topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "686e073e2181bef8f5bc97f8",
      username: "sangammundhe",
    },
    createdAt: "2025-08-06T04:32:10.899Z",
    updatedAt: "2025-08-06T04:32:10.899Z",
    __v: 0,
    likes: 0,
    dislikes: 0,
    replies: 3,    isLike:false,

  },
  {
    _id: "6892daba95da3adc05bf1984",
    title: "What is the difference between var, let, and const?",
    body: "In JavaScript, what’s the difference between var, let, and const?",
    topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "686e073e2181bef8f5bc97f8",
      username: "sangammundhe",
    },
    createdAt: "2025-08-06T04:31:54.342Z",
    updatedAt: "2025-08-06T04:31:54.342Z",
    __v: 0,
    likes: 0,
    dislikes: 0,
    replies: 3,    isLike:false,

  },
  {
    _id: "6892daaf95da3adc05bf1981",
    title: "What are React hooks?",
    body: "I keep hearing about hooks like useState and useEffect. Can someone explain what they do?",
   topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "686e073e2181bef8f5bc97f8",
      username: "sangammundhe",
    },
    createdAt: "2025-08-06T04:31:43.793Z",
    updatedAt: "2025-08-06T04:31:43.793Z",
    __v: 0,
    likes: 0,
    dislikes: 0,
    replies: 3,    isLike:false,

  },
  {
    _id: "6892daa595da3adc05bf197e",
    title: "Best practices for JWT authentication?",
    body: "What are the best practices to implement JWT authentication in Node.js?",
   topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "686e073e2181bef8f5bc97f8",
      username: "sangammundhe",
    },
    createdAt: "2025-08-06T04:31:33.087Z",
    updatedAt: "2025-08-06T04:31:33.087Z",
    __v: 0,
    likes: 0,
    dislikes: 0,
    replies: 3,    isLike:false,

  },
  {
    _id: "6892da9d95da3adc05bf197b",
    title: "MongoDB vs PostgreSQL for backend?",
    body: "Which one is more suitable for my MERN stack project?",
    topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "686e073e2181bef8f5bc97f8",
      username: "sangammundhe",
    },
    createdAt: "2025-08-06T04:31:25.467Z",
    updatedAt: "2025-08-06T04:31:25.467Z",
    __v: 0,
    likes: 0,
    dislikes: 0,
    replies: 3,    isLike:false,

  },
  {
    _id: "6892da9695da3adc05bf1978",
    title: "What is RESTful API?",
    body: "Can someone explain the principles of REST and how REST APIs work?",
topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "686e073e2181bef8f5bc97f8",
      username: "sangammundhe",
    },
    createdAt: "2025-08-06T04:31:18.440Z",
    updatedAt: "2025-08-06T04:31:18.440Z",
    __v: 0,
    likes: 0,
    dislikes: 0,
    replies: 3,    isLike:false,

  },
  {
    _id: "6892da8f95da3adc05bf1975",
    title: "Explain event loop in Node.js",
    body: "What is the event loop in Node.js and why is it important?",
   topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "686e073e2181bef8f5bc97f8",
      username: "sangammundhe",
    },
    createdAt: "2025-08-06T04:31:11.681Z",
    updatedAt: "2025-08-06T04:31:11.681Z",
    __v: 0,
    likes: 0,
    dislikes: 0,
    replies: 3,    isLike:true,

  },
  {
    _id: "6892da8395da3adc05bf1972",
    title: "Why is React better than plain JavaScript?",
    body: "I'm trying to understand when I should use React over vanilla JS for a frontend project.",
   topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "686e073e2181bef8f5bc97f8",
      username: "sangammundhe",
    },
    createdAt: "2025-08-06T04:30:59.221Z",
    updatedAt: "2025-08-06T04:30:59.221Z",
    __v: 0,
    likes: 0,
    dislikes: 0,
    replies: 3,    isLike:false,

  },
  {
    _id: "6892da7295da3adc05bf196f",
    title: "What is a promise in JavaScript?",
    body: "Can someone explain what a promise is in JavaScript and how it works with async/await?",
   topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "686e073e2181bef8f5bc97f8",
      username: "sangammundhe",
    },
    createdAt: "2025-08-06T04:30:42.634Z",
    updatedAt: "2025-08-06T04:30:42.634Z",
    __v: 0,
    likes: 0,
    dislikes: 0,    isLike:false,

    replies: 3,
  },
  {
    _id: "6892da6895da3adc05bf196c",
    title: "Difference between SQL and NoSQL databases?",
    body: "Which one should I use for a scalable web application and why?",
  topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "686e073e2181bef8f5bc97f8",
      username: "sangammundhe",
    },
    createdAt: "2025-08-06T04:30:32.712Z",
    updatedAt: "2025-08-06T04:30:32.712Z",
    __v: 0,
    likes: 0,
    dislikes: 0,    isLike:false,

    replies: 3,
  },
  {
    _id: "6892da5b95da3adc05bf1969",
    title: "How does JavaScript closure work?",
    body: "I've heard about closures in JavaScript, but I still don't understand how they work. Can someone explain with a simple example?",
    topics: ["javascript","react","nodejs","dev"],
    userId: {
      _id: "686e073e2181bef8f5bc97f8",
      username: "sangammundhe",
    },
    createdAt: "2025-08-06T04:30:19.991Z",
    updatedAt: "2025-08-06T04:30:19.991Z",
    __v: 0,
    likes: 0,
    dislikes: 0,
    replies: 3,    isLike:true,

  },
];

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("latest");

  const filteredQuestions = () => {
    if (activeTab === "trending")
      return mockQuestions.filter((q) => q.likes > 1);
    if (activeTab === "unanswered")
      return mockQuestions.filter((q) => q.replies === 0);
    return mockQuestions;
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
              filteredQuestions().map((question) => (
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

"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UserData {
  id: string;
  username: string;
  email: string;
  bio?: string;
}

export default function UserProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user/${params.userId}`);
        const data = res.data;
        
        if (data.error) {
          toast.error(data.message);
          setUser(null);
        } else {
          setUser(data.data.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [params.userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <h1 className="text-2xl font-semibold text-gray-700">User Not Found</h1>
        <p className="text-gray-500 mt-2">
          The profile you’re looking for doesn’t exist.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className=" bg-slate-900 shadow-md rounded-xl p-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-white">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {user.bio && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Bio</h2>
            <p className="text-gray-700 mt-1">{user.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}

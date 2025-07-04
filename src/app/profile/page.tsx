"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<string>("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.error(error.message);
      toast.error("Logout failed");
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
      toast.success("User data loaded");
    } catch (err: any) {
      toast.error("Failed to fetch user");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
          User Profile
        </h1>

        <p className="text-purple-200 mb-4">Welcome to your profile page!</p>

        {data ? (
          <p className="text-white mb-4">
            Go to your profile:{" "}
            <Link
              href={`/profile/${data}`}
              className="text-blue-300 underline hover:text-pink-400"
            >
              {data}
            </Link>
          </p>
        ) : (
          <p className="text-purple-400 mb-4">No user loaded yet</p>
        )}

        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={getUserDetails}
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition duration-200"
          >
            Get User Details
          </button>

          <button
            onClick={logout}
            className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>

        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full opacity-60"></div>
      </div>
    </div>
  );
}

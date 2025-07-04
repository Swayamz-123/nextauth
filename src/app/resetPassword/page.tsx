"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false); // NEW

  useEffect(() => {
    const tokenFromUrl = window.location.search.split("=")[1];
    setToken(tokenFromUrl || "");
    setMounted(true); // NEW
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/users/resetpassword", { token, password });
      setDone(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      console.error(err.response?.data);
      setError(true);
    }
  };

  if (!mounted) return null; // NEW: prevent mismatch

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-3">
            Reset Password
          </h1>
          <p className="text-purple-200 text-sm">Set your new password</p>
          <div className="w-20 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="space-y-6">
          {done ? (
            <div className="text-green-400 text-center">
              ✅ Password reset successful! Redirecting to login...
            </div>
          ) : (
            <>
              <div className="space-y-3">
                <label htmlFor="password" className="block text-sm font-semibold text-purple-200">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  className="w-full px-4 py-4 bg-white/5 backdrop-blur border border-white/20 rounded-xl text-white placeholder-purple-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105"
              >
                Reset Password
              </button>
            </>
          )}

          {error && (
            <div className="text-red-500 text-center mt-2">
              ❌ Error resetting password. Please try again.
            </div>
          )}
        </div>

        {/* Decorative bottom element */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full opacity-60"></div>
      </div>
    </div>
  );
}

"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false); // hydration-safe rendering

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
    setMounted(true); // allow render after mounting
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  // Prevent hydration mismatch error
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
          Email Verification
        </h1>

        <div className="text-purple-200 text-sm mb-4">
          {token ? (
            <p>
              Verifying token:{" "}
              <span className="text-white font-mono break-all">{token}</span>
            </p>
          ) : (
            <p>No token provided in URL.</p>
          )}
        </div>

        {verified && (
          <div className="text-green-400 space-y-4">
            <h2 className="text-2xl font-semibold">✅ Your email has been verified!</h2>
            <Link
              href="/login"
              className="inline-block mt-2 px-6 py-3 bg-white/10 backdrop-blur border border-white/30 text-white font-medium rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              Go to Login →
            </Link>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-lg mt-4">
            ❌ Invalid or expired verification link. Please try again.
          </div>
        )}

        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full opacity-60"></div>
      </div>
    </div>
  );
}

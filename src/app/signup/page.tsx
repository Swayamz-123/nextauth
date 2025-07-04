"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const router = useRouter();
    
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  });

  const onSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/users/signup', user);
      console.log("Signup success", response.data);
      toast.success("Signup successful!");
      router.push('/login');
    } catch (error: any) {
      console.log("Signup failed", error);
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-3">
            Join Us
          </h1>
          <p className="text-purple-200 text-sm">Create your account and get started</p>
          <div className="w-20 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mx-auto rounded-full mt-4"></div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="username" className="block text-sm font-semibold text-purple-200">
              Username
            </label>
            <input 
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-4 bg-white/5 backdrop-blur border border-white/20 rounded-xl text-white placeholder-purple-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="email" className="block text-sm font-semibold text-purple-200">
              Email Address
            </label>
            <input 
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-4 bg-white/5 backdrop-blur border border-white/20 rounded-xl text-white placeholder-purple-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="password" className="block text-sm font-semibold text-purple-200">
              Password
            </label>
            <input 
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Create a strong password"
              required
              className="w-full px-4 py-4 bg-white/5 backdrop-blur border border-white/20 rounded-xl text-white placeholder-purple-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
            />
          </div>

          <button
            onClick={onSignup}
            disabled={buttonDisabled || loading}
            className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 ${
              buttonDisabled || loading
                ? 'bg-gray-600/50 cursor-not-allowed border border-gray-500/50' 
                : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Creating...
              </div>
            ) : (
              buttonDisabled ? "Please fill all fields" : "Create Account ✨"
            )}
          </button>

          <div className="text-center pt-6">
            <p className="text-purple-200 text-sm mb-4">Already have an account?</p>
            <Link 
              href="/login"
              className="inline-block px-8 py-3 bg-white/10 backdrop-blur text-white font-semibold border border-white/30 rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Sign In Instead
            </Link>
          </div>
        </div>

        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full opacity-60"></div>
      </div>
    </div>
  );
}

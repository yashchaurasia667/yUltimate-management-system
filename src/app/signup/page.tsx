"use client";

import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// import { SignUp } from "@clerk/nextjs";
// import Image from "next/image";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-linear-to-br from-secondary via-white to-secondary flex items-center justify-center min-h-screen p-4 font-['Inter',_sans-serif]">
      <main className="flex flex-col md:flex-row max-w-4xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="w-full md:w-1/2 bg-gray-200 min-h-[300px] md:min-h-0 flex items-center justify-center p-8">
          <div className="text-gray-500 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 inline-block opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1.586-1.586a2 2 0 00-2.828 0L6 14m6-6l.01.01"
              />
            </svg>
            <p className="mt-2 text-sm">Image Placeholder</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white p-10 md:p-14">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign up to Y-Ultimate</h2>
          <form className="mt-8 space-y-5">
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                placeholder="John Doe"
                className="w-full p-4 bg-gray-100 rounded-xl border-none text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full p-4 bg-gray-100 rounded-xl border-none text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                className="w-full p-4 pr-12 bg-gray-100 rounded-xl border-none text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye-Off Icon (Password visible)
                  <FaRegEyeSlash />
                ) : (
                  <FaRegEye />
                )}
              </button>
            </div>

            <p className="text-gray-600">
              Already have an account?
              <a href="#" className="text-secondary font-semibold hover:text-primary">
                Sign in
              </a>
            </p>

            {/* Submit Button */}
            {/* I added this button as it's necessary for a sign-up form */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-primary text-white p-3 rounded-xl font-bold text-lg hover: transition duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Page;

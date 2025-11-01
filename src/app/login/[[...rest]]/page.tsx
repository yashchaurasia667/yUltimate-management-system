"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const textFieldStyle =
    "w-full p-4 bg-gray-100 rounded-xl border-none text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary";

  return (
    <div className="bg-linear-to-br from-secondary via-white to-secondary flex items-center justify-center min-h-screen p-4 font-['Inter',sans-serif]">
      <main className="flex flex-col md:flex-row max-w-4xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="w-full md:w-1/2 bg-gray-200 min-h-[300px] md:min-h-0 overflow-hidden flex items-center">
          <Image src={"/LogoNoBG.png"} alt="Yultimate logo" width={1000} height={1000} className="w-[125%]" />
        </div>

        <div className="w-full md:w-1/2 bg-white p-10 md:p-14">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Login to Y-Ultimate</h2>
          <form className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input type="email" id="email" name="email" placeholder="you@example.com" className={textFieldStyle} />
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
                className={textFieldStyle}
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

            <p className="text-gray-600 pt-4">
              {"Don't have an account Yet? "}
              <Link href="/signup" className="text-secondary font-semibold hover:text-primary">
                Sign up
              </Link>
            </p>

            <div className="">
              <button
                type="submit"
                className="w-full bg-primary text-white p-3 rounded-xl font-bold text-lg hover: transition duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Page;

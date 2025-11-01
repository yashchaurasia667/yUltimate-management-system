"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Page = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [emailAddress, setemailAddress] = useState("");
  const [password, setpassword] = useState("");
  const [pendingVerification, setpendingVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState("");
  const [typewriterText, setTypewriterText] = useState("");

  const router = useRouter();

  const fullText = "Verification link sent! Please check your email...";

  useEffect(() => {
    if (pendingVerification) {
      let index = 0;
      setTypewriterText("");

      const interval = setInterval(() => {
        if (index < fullText.length) {
          setTypewriterText((prev) => prev + fullText.charAt(index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [pendingVerification]);

  useEffect(() => {
    if (!pendingVerification || !isLoaded) return;

    const checkVerification = setInterval(async () => {
      try {
        await signUp?.reload();

        if (signUp?.status === "complete") {
          clearInterval(checkVerification);
          await setActive({ session: signUp.createdSessionId });
          router.push("/");
        }
      } catch (err) {
        console.error("Error checking verification:", err);
      }
    }, 2000);

    return () => clearInterval(checkVerification);
  }, [pendingVerification, isLoaded, signUp, setActive, router]);

  if (!isLoaded) {
    return null;
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    seterror("");
    setIsLoading(true);

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_link",
        redirectUrl: `${window.location.origin}/`,
      });

      setpendingVerification(true);
    } catch (error) {
      if (error instanceof Error) {
        seterror(error.message || "Sign up failed");
      }
      console.log(JSON.stringify(error, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const textFieldStyle =
    "w-full p-4 bg-gray-100 rounded-xl border-none text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary";

  if (pendingVerification) {
    return (
      <div className="bg-linear-to-br from-secondary via-white to-secondary flex items-center justify-center min-h-screen p-4 font-['Inter',sans-serif]">
        <main className="flex flex-col items-center justify-center max-w-md w-full bg-white shadow-2xl rounded-3xl p-10">
          <div className="w-32 h-32 mb-6">
            <Image src={"/LogoNoBG.png"} alt="Yultimate logo" width={128} height={128} className="w-full h-full" />
          </div>

          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Check Your Email</h2>

          <p className="text-gray-600 text-center mb-2 min-h-12">
            {typewriterText}
            {typewriterText.length < fullText.length && <span className="animate-pulse">|</span>}
          </p>

          <p className="text-sm text-gray-500 text-center">
            Sent to: <span className="font-semibold">{emailAddress}</span>
          </p>

          <button
            onClick={() => {
              setpendingVerification(false);
              seterror("");
            }}
            className="mt-6 text-secondary hover:text-primary font-semibold"
          >
            Use a different email
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-secondary via-white to-secondary flex items-center justify-center min-h-screen p-4 font-['Inter',sans-serif]">
      <main className="flex flex-col md:flex-row max-w-4xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="w-full md:w-1/2 bg-gray-200 min-h-[300px] md:min-h-0 overflow-hidden flex items-center">
          <Image src={"/LogoNoBG.png"} alt="Yultimate logo" width={1000} height={1000} className="w-[125%]" />
        </div>

        <div className="w-full md:w-1/2 bg-white p-10 md:p-14">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign Up to Y-Ultimate</h2>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form className="mt-8 space-y-5" onSubmit={submit}>
            <div className="mt-4">
              <button
                type="button"
                className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-xl font-semibold text-lg flex items-center justify-center hover:bg-gray-50 transition duration-300 shadow-sm hover:shadow-md gap-x-5"
              >
                <FcGoogle />
                Continue with Google
              </button>
            </div>

            <div className="relative flex items-center">
              <div className="grow border-t border-gray-300"></div>
              <span className="shrink mx-4 text-gray-400">or</span>
              <div className="grow border-t border-gray-300"></div>
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
                required
                value={emailAddress}
                onChange={(e) => setemailAddress(e.target.value)}
                className={textFieldStyle}
                disabled={isLoading}
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
                required
                value={password}
                className={textFieldStyle}
                onChange={(e) => setpassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>

            <p className="text-gray-600 pt-4">
              Already have an account?{" "}
              <Link href="/signin" className="text-secondary font-semibold hover:text-primary">
                Sign in
              </Link>
            </p>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white p-3 rounded-xl font-bold text-lg hover:opacity-90 transition duration-300 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>
            </div>
            <div id="clerk-captcha" />
          </form>
        </div>
      </main>
    </div>
  );
};

export default Page;

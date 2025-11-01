"use client";
import Link from "next/link";
import Image from "next/image";
// import { redirect } from "next/navigation";

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ButtonDefault from "./buttonDefault";

// const rdr = () => {
//   redirect("/");
// };

// function resdirect(arg0: string) {
//   throw new Error("Function not implemented.");
// }

const Navbar = () => {
  return (
    <div className="flex sticky h-25 items-center justify-between bg-primary px-6">
      <Link href={"/"}>
        <Image
          src="/logo-white.png"
          loading="eager"
          alt="YUltimate logo"
          height={70}
          width={70}
          className="scale-125"
        />
      </Link>

      <div className="">
        <SignedOut>
            <SignUpButton>
          
            <button
                className="text-text font-medium bg-white text-lg px-6 py-3 outline-none cursor-pointer hover:font-semibold hover:scale-105 transition-all  rounded-full !bg-[#f0dce4]"
              >
                Sign Up
            </button>

          </SignUpButton>

          <SignInButton >
            
              <button
                className="text-text font-medium bg-white text-lg px-6 py-3 outline-none cursor-pointer hover:font-semibold hover:scale-105 transition-all rounded-full mx-3"
              >
                Login
              </button>
            
          </SignInButton>

        </SignedOut>
        <SignedIn>
          <div className="h-[30px] mb-7">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "48px",
                    height: "48px",
                  },
                  userButtonAvatarImage: {
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                  },
                },
              }}
            />
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;

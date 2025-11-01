import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

const Page = () => {
  return (
    <div className="bg-background flex justify-center items-center h-screen">
      <div className="bg-secondary rounded-xl w-[700px] min:w-full flex flex-col items-center">
        <Image src={"/logo.png"} loading="eager" alt="YUltimate logo" height={120} width={120} />
        <div className="w-full flex justify-center">
          <button className="bg-background px-4 py-2 rounded-md cursor-pointer hover:bg-secondary-faded min-w-[600px] w-full">
            <span className="cl-internal-11tkpc3">
              <Image
                // srcset="https://img.clerk.com/static/google.svg?width=80 1x,https://img.clerk.com/static/google.svg?width=160 2x"
                src="https://img.clerk.com/static/google.svg?width=160"
                className="cl-socialButtonsProviderIcon cl-providerIcon cl-socialButtonsProviderIcon__google cl-providerIcon__google 🔒️ cl-internal-2gzuzc"
                width={100}
                height={100}
                alt="Sign in with Google"
              />
              <span className="text-md" data-localization-key="socialButtonsBlockButton">
                Continue with Google
              </span>
            </span>
          </button>
        </div>
      </div>

      <SignUp />
    </div>
  );
};

export default Page;

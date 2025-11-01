import { SignIn } from "@clerk/nextjs";

function page() {
  return (
    <div className="grid place-items-center">
      <SignIn />
    </div>
  );
}

export default page;

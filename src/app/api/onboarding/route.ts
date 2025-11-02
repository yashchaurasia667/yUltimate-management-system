import dbconnect from "@/lib/dbconnect";
import { accountModel } from "@/lib/models";
// import { currentUser } from "@clerk/nextjs/server";

type details = {
  name: string;
  // password: string;
  age: number;
  address: string;
  city: string;
  state: string;
  type: "coach" | "student";
  course: string;
  profileUrl?: string;
};

export async function POST(req: Request) {
  // const { name, age, address, city, state, type, course, profileUrl }: details = await req.json();
  const data = await req.json();
  console.log(data);
  const { name, age, address, city, state, type, course, profileUrl }: details = data;
  if (!name || !age || !address || !city || !state || !type) {
    return Response.json({ success: false, message: "Bad Request: missing details" }, { status: 400 });
  }

  try {
    await dbconnect();
    let user;
    if (type == "coach") {
      if (!course) {
        return Response.json({ success: false, message: "Bad Request: missing details" }, { status: 400 });
      }

      user = await accountModel.create({
        approved: false,
        name: name,
        age: age,
        address: address,
        city: city,
        state: state,
        type: "coach",
        course: course,
        profile: profileUrl ? profileUrl : "",
      });
    } else {
      user = await accountModel.create({
        approved: false,
        name: name,
        age: age,
        address: address,
        city: city,
        state: state,
        course: "gooning 101",
        type: "student",
        profile: profileUrl ? profileUrl : "",
      });
    }

    if (!user) {
      throw new Error("Failed to create user");
    }

    return Response.json({ success: true, message: "Account details saved, now redirecting to /profile" });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: `Internal Server Error: ${error}` }, { status: 500 });
  }
}

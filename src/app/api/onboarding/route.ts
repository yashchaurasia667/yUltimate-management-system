import dbconnect from "@/lib/dbconnect";
import { accountModel } from "@/lib/models";

type details = {
  name: string;
  age: number;
  address: string;
  city: string;
  state: string;
  type: "coach" | "student";
  course: string;
  profileUrl?: string;
};

export async function POST(req: Request) {
  const { name, age, address, city, state, type, course }: details = await req.json();
  if (!name || !age || !address || !city || !state || !type || !course) {
    return Response.json({ success: false, message: "Bad Request: missing details" }, { status: 400 });
  }

  try {
    await dbconnect();
    let user;
    if (type == "coach") {
      user = await accountModel.create({
        approved: false,
        name: name,
        email: "kratikmishra@gmail.com",
        age: age,
        address: address,
        city: city,
        state: state,
        type: "coach",
        course: course,
        profile: "github.com/yupAyush",
      });
    } else {
      user = await accountModel.create({
        approved: false,
        name: name,
        email: "kraticjdhkmishra@gmail.com",
        age: age,
        address: address,
        city: city,
        state: state,
        type: "student",
        profile: "github.com/yupAyush",
      });
    }

    if (!user) {
      throw new Error("Failed to create user");
    }

    return Response.json({ success: true, message: "Account details saved, now redirecting to /profile" });
  } catch (error) {
    return Response.json({ success: false, message: `Internal Server Error: ${error}` }, { status: 500 });
  }
}

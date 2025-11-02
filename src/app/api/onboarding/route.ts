import dbconnect from "@/lib/dbconnect";
import { accountModel } from "@/lib/models";
import { currentUser } from '@clerk/nextjs/server'

type details = {
  
  name: string;
  password: string;
  age: number;
  address: string;
  city: string;
  state: string;
  type: "coach" | "student";
  course: string;
  profileUrl?: string;
};

export async function POST(req: Request) {
  const {name, password, age, address, city, state, type, course, profileUrl }: details = await req.json();
 
  

  try {
    await dbconnect();
    if (type == "coach") {
      await accountModel.create({
        approved: true,
        name: name,
        email: "kratikmishra@gmail.com",
        password: password,
        age: age,
        address: address,
        city: city,
        state: state,
        type: "coach",
        course: course,
        profile: profileUrl ? profileUrl : "",
      });
    } else {
      await accountModel.create({
        approved: true,
        name: name,
        email: "kraticjdhkmishra@gmail.com",
        password: password,
        age: age,
        address: address,
        city: city,
        state: state,
        type: "student",
        profile: profileUrl ? profileUrl : "",
      });
    }

    return Response.json({ success: true, message: "Account details saved, now redirecting to /profile" });
  } catch (error) {
    return Response.json({ success: false, message: `Internal Server Error: ${error}` });
  }
}

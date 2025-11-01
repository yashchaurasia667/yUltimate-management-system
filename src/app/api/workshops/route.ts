import dbconnect from "@/lib/dbconnect";
import { accountModel } from "@/lib/models";

export async function POST(request: Request) {
  const { approved, name, password, age, address, city, state } = await request.json();
  try {
    await dbconnect();
    await accountModel.create({
      approved: approved,
      name: name,
      password: password,
      age: age,
      address: address,
      city: city,
      state: state,
      type: "student",
      profile: "",
    });

    return Response.json({ sucess: true, message: "data is saved" });
  } catch (error) {
    return Response.json({ sucess: false, message: `internal serval error: ${error}` });
  }
}

export async function GET(request: Request) {
  return Response.json({ sucess: true, message: "from get" });
}

import dbconnect from "@/lib/dbconnect";
import { accountModel } from "@/lib/models";

type req = {
  id: string;
};

export async function POST(req: Request) {
  const { id }: req = await req.json();
  if (!id) {
    return Response.json({ success: false, message: "id is required to fetch user details" });
  }

  try {
    await dbconnect();
    const user = await accountModel.findById(id).select("-password");
    if (user) {
      return Response.json({ success: true, message: user });
    } else {
      throw new Error("The given user does not exist");
    }
  } catch (error) {
    return Response.json({ success: false, message: `Internal Server Error: ${error}` });
  }
}

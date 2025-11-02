import dbconnect from "@/lib/dbconnect";
import { accountModel } from "@/lib/models";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ success: false, message: "id is required to fetch user details" }, { status: 400 });
  }

  try {
    await dbconnect();
    const user = await accountModel.findById(id);
    if (user) {
      return Response.json({ success: true, message: user });
    } else {
      throw new Error("The given user does not exist");
    }
  } catch (error) {
    return Response.json({ success: false, message: `Internal Server Error: ${error}` });
  }
}

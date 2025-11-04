import dbconnect from "@/lib/dbconnect";
import { eventModel } from "@/lib/models";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return Response.json({ success: false, message: "Bad request: event id is required" }, { status: 400 });
  }

  try {
    await dbconnect();
    const event = await eventModel.findById(id);
    if (event) {
      return Response.json({ success: true, message: event });
    } else {
      throw new Error("The given user does not exist");
    }
  } catch (error) {
    return Response.json({ success: false, message: `Internal Server Error: ${error}` }, { status: 500 });
  }
}

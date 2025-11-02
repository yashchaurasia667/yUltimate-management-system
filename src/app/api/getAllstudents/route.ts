import dbconnect from "@/lib/dbconnect";
import { accountModel } from "@/lib/models";

export async function GET() {
  try {
    await dbconnect();
    const students = await accountModel.find({ type: "student" });
    if (students) {
      return Response.json(students);
    } else {
      return Response.json({ message: "there are no student" });
    }
  } catch (error) {
    return Response.json({ success: false, message: `Internal Server Error: ${error}` });
  }
}

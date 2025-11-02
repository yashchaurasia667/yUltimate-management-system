import dbconnect from "@/lib/dbconnect";
import { accountModel } from "@/lib/models";

type req = {
  id: string;
  user_id: string;
  approvalStatus: boolean;
};

export async function POST(req: Request) {
  const { id, user_id, approvalStatus }: req = await req.json();
  if (!id || !user_id || approvalStatus === undefined) {
    return Response.json(
      { success: false, message: "Bad request: id, user_id and approval status are required" },
      { status: 401 }
    );
  }

  try {
    await dbconnect();
    const admin = await accountModel.findById(id);
    if (!admin) {
      throw new Error("Failed to verify admin account");
    }
    if (admin.type !== "coach") {
      return Response.json(
        { success: false, message: "You don't have necessary privelage to perform that action" },
        { status: 401 }
      );
    }

    let user;
    if (approvalStatus) {
      user = await accountModel.findByIdAndUpdate(user_id, { approved: approvalStatus });
    } else if (approvalStatus === false) {
      user = await accountModel.findByIdAndDelete(user_id);
    }
    if (user) return Response.json({ success: true, message: "Account approved" });
    else return Response.json({ success: false, message: "Could not find the user" }, { status: 404 });
  } catch (error) {
    return Response.json({ success: false, message: `Internal Server Error: ${error}` });
  }
}

import dbconnect from "@/lib/dbconnect";
import { accountModel } from "@/lib/models";

export async function POST(request: Request) {
  try {
    const { id, type, approved } = await request.json();

    if (!id || !type) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Missing required fields: id and type are required" 
        }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await dbconnect();

    console.log(`Updating user: ${id}, type: ${type}, approved: ${approved}`);

    
    if (approved === true || approved === false) {
      const updatedUser = await accountModel.findByIdAndUpdate(
        id,
        { approved: approved }, 
        { new: true } 
      );

      if (!updatedUser) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: "User not found with the provided ID" 
          }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      console.log(`Successfully updated user ${id} to approved: ${approved}`);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `User ${approved ? "approved" : "rejected"} successfully`,
          user: { id: updatedUser._id, approved: updatedUser.approved }
        }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Invalid approved status. Must be true or false" 
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error updating user approval:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
import dbconnect from "@/lib/dbconnect";
import { accountModel } from "@/lib/models";


export async function GET(req: Request) {
 
  try {
    await dbconnect();
    const coachs = await accountModel.find({type:"coach"})
    if(coachs){
        return Response.json(coachs)
    }else{
        return Response.json({message:"there are no coaches"})
    }

   
   
  } catch (error) {
    return Response.json({ success: false, message: `Internal Server Error: ${error}` });
  }
}




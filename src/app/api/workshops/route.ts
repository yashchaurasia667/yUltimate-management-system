import dbconnect from "@/lib/dbconnect";
import { studentModel } from "@/lib/models";

export async function POST(request:Request){
    const {approval ,name,password,age,address,city,state}= await request.json()
    try {

        await dbconnect();
        await studentModel.create({
            approved:approval,
            name:name,
            password: password,
            age:age,
            address:address,
            city:city,
            state:state
        })

        return Response.json({sucess:true,message:"data is saved"})
        
    } catch (error) {
        return Response.json({sucess:false,message:"internal serval error"})
        
    }


}

export  async function GET(request:Request) {

    return Response.json({sucess:true,message:"from get "})
    
}
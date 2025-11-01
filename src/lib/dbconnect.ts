import mongoose from "mongoose"

type ConnectionObject = {
    isConnected?:number
}

const connection: ConnectionObject = {}

async function dbconnect():Promise<void> {
    if(connection.isConnected){ //chechking if already connected so that we don't connect again and choke the server
        console.log("MongoDB is already connected");
        return;
    }
    try {
    const connectionString = process.env.CONNECTION_STRING;
    if (!connectionString) {
        throw new Error("MongoDB connection string is not defined in environment variables.");
    }
    const db = await mongoose.connect(connectionString);
    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB connected successfully");
        
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        
        process.exit(1);
                  
        
    }
     
     

}
export default dbconnect;
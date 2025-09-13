import mongoose from "mongoose";
import { env } from "@/lib/env"

type ConnectionObj = {
    isConnected?: number
}

const connection: ConnectionObj = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("dbConnect: Already connected to database.");
        return;
    }

    try {
        const connectToDatabase = await mongoose.connect(`${env.MONGODB_URI}/${env.MONGODB_DB_NAME}`)
        connection.isConnected = connectToDatabase.connections[0].readyState;
        if (connectToDatabase) {
            console.log("dbConnect: Successfully connected to database.");
            return;
        }
    } catch (error) {
        console.error((error as Error)?.message || "Failed to connect to database!")
        process.exit(1)
    }
}

export default dbConnect;
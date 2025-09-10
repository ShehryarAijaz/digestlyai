import mongoose from "mongoose";
import { env } from "@/lib/env"

type ConnectionObj = {
    isConnected?: number
}

const connection: ConnectionObj = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) return;

    try {
        const connectToDatabase = await mongoose.connect(`${env.MONGODB_URI}/${env.MONGODB_DB_NAME}`)
        if (connectToDatabase) return;

    } catch (error) {
        console.error((error as Error)?.message || "Failed to connect to database!")
        process.exit(1)
    }
}

export default dbConnect;
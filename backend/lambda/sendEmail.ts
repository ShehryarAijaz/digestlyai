import { MongoClient } from 'mongodb';
import fetch from 'node-fetch';

const MONGODB_URI = process.env.MONGODB_URI as string
const RESEND_API_KEY = process.env.RESEND_API_KEY as string
const BASE_API_URL = process.env.BASE_API_URL as string

exports.handler = async function (event: any) {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    const db = client.db("emaildigest")
    const user = db.collection("users")

    const allUsers = await user.find({}).toArray();
    const now = new Date();

    for (const user of allUsers) {
        const lastSent = user.lastEmailSent ? new Date(user.lastEmailSent) : null;
        const signupDate = new Date(user.created_at)
        let sendEmail = false;

        // Determine if email is due
    }
}
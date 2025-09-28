import { MongoClient } from 'mongodb';
import fetch from 'node-fetch';
import { marked } from 'marked';

const MONGODB_URI = process.env.MONGODB_URI as string
const RESEND_API_KEY = process.env.RESEND_API_KEY as string
const BASE_API_URL = process.env.BASE_API_URL as string

exports.handler = async function (event: any) {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    const db = client.db("email-digest")
    const usersCollection = db.collection("users")

    const allUsers = await usersCollection.find({}).toArray();
    console.log(`Found ${allUsers.length} users`, allUsers)
    const now = new Date();

    for (const u of allUsers) {
        const lastSent = u.lastEmailSent ? new Date(u.lastEmailSent) : null;
        const signupDate = new Date(u.createdAt)
        let sendEmail = false;

        // Determine if email is due
        switch (u.frequency) {
            case "hourly":
                if (!lastSent) {
                    // if the time between now and signup is >= 1 hour, sendEmail
                    if (now.getTime() - signupDate.getTime() >= 60 * 60 * 1000) sendEmail = true;
                } else {
                    // else if time between now and lastSent is >= 1 hour, sendEmail
                    if (now.getTime() - lastSent.getTime() >= 60 * 60 * 1000) sendEmail = true;
                }
                break;

            case "daily":
                if (!lastSent) {
                    if (now.getTime() - signupDate.getTime() >= 24 * 60 * 60 * 1000) sendEmail = true;
                } else {
                    if (now.getTime() - lastSent.getTime() >= 24 * 60 * 60 * 1000) sendEmail = true;
                }
                break;

            case "weekly":
                if (!lastSent) {
                    if (now.getTime() - signupDate.getTime() >= 7 * 24 * 60 * 60 * 1000) sendEmail = true;
                } else {
                    if (now.getTime() - lastSent.getTime() >= 7 * 24 * 60 * 60 * 1000) sendEmail = true;
                }
                break;
        }
        
        if (!sendEmail) continue;

        try {
            // Call /api/summarize to get content
            const summaryResponse = await fetch(`${BASE_API_URL}/api/summarize`);
            const summaryJson: any = await summaryResponse.json()

            const summaryHtml = marked.parse(summaryJson.summary)
            const emailHtml = `
                            <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
                                <h1 style="color: #2c3e50;">Your Summary</h1>
                                ${summaryHtml}
                            </div>
                            `;
            
            const resendRes = await fetch(`https://api.resend.com/emails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${RESEND_API_KEY}`
                },
                body: JSON.stringify({
                    from: 'Acme <onboarding@resend.dev>',
                    to: [u.email],
                    subject: 'hello world',
                    html: emailHtml
                })
            })

            const resendJson = await resendRes.json()

            if (!resendRes.ok) {
                console.error(`Failed to send summary to ${u.email}`, resendJson)
            } else {
                console.log(`Email sent to ${u.email}`, resendJson)
            }

            // Update lastEmailSent
            await usersCollection.updateOne(
                { _id: u._id },
                { $set: { lastEmailSent: now.toISOString() } }
            )

            console.log(`Email sent to ${u.email}`)

        } catch(error: any) {
            console.error(`Error sending email to ${u.email}`, error)
        }
    }

    await client.close()
    return { statusCode: 200, body: "Done" };
}
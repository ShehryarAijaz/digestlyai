import UserModel from "@/models/user.model";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { User } from "next-auth"

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Unauthorized"
        },
        {
            status: 401
        })
    }
    
    const user = session.user as User

    const { frequency } = await request.json()

    console.log("frequency", frequency.toLowerCase())

    try {

        const updatedUser = await UserModel.findOneAndUpdate(
            { email: user.email },
            { $set:
                { "frequency": frequency.toLowerCase()
                }
            },
            { new: true, upsert: false }
        );

        console.log("updatedUser", updatedUser)

        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "User not found"
            },
            {
                status: 404
            })
        }

        return Response.json({
            success: true,
            message: "Frequency updated successfully",
            frequency: updatedUser.frequency
        },
        {
            status: 200
        })
    } catch (error) {

        return Response.json({
            success: false,
            message: "Error updating frequency"
        },
        {
            status: 500
        })
    }
};
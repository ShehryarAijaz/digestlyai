import UserModel from "@/app/models/user.model";
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

    const { account1, account2, account3 } = await request.json()

    console.log("accountsToAdd", account1, account2, account3)

    const accountsToAdd = [account1, account2, account3].map(account => account.replace(/\s+/g, "")).filter(Boolean);

    console.log("accountsToAdd", accountsToAdd)

    try {

        const updatedUser = await UserModel.findOneAndUpdate(
            { email: user.email },
            { $set:
                { "socialHandles.accounts": accountsToAdd
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
            message: "Accounts added successfully",
            user: updatedUser
        },
        {
            status: 200
        })
    } catch (error) {

        return Response.json({
            success: false,
            message: "Error adding accounts"
        },
        {
            status: 500
        })
    }
};

export async function GET() {
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

    const userDetails = await UserModel.findOne({ email: user.email })

    if (!userDetails) {
        return Response.json({
            success: false,
            message: "User not found"
        },
        {
            status: 401
        })
    }

    return Response.json({
        success: true,
        message: "User details fetched successfully",
        user: userDetails
    },
    {
        status: 200
    })

}
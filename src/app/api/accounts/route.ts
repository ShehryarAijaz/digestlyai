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

    try {

        const getUser = await UserModel.findOne({ email: user.email })

        if (!getUser) {
            return Response.json({
                success: false,
                message: "User not found"
            },
            {
                status: 404
            })
        }

        const accountsToAdd = [account1, account2, account3].filter(Boolean);
        
        getUser.socialHandles.accounts.push(
        ...accountsToAdd.filter(acc => !getUser.socialHandles.accounts.includes(acc))
        );

        await getUser.save();

        return Response.json({
            success: true,
            message: "Accounts added successfully",
            user: getUser
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
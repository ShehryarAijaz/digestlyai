import mongoose from "mongoose";

export interface SocialHandles extends Document {
    accounts: string[],
}

const SocialHandlesSchema: mongoose.Schema<SocialHandles> = new mongoose.Schema({
    accounts: {
        type: [String],
        required: true,
        validate: [(val: string[]) => val.length <= 3, '{PATH} exceeds the limit of 3']
    }
})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    socialHandles: SocialHandles[];
    frequency: 'daily' | 'weekly' | 'monthly';
}

const userSchema: mongoose.Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    socialHandles: SocialHandlesSchema,
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly"]
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema)

export default UserModel;
import mongoose from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    password?: string; // Optional for OAuth users
    isVerified: boolean;
    frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
    lastEmailSent?: string;
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
        required: false, // Not required for OAuth users
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    frequency: {
        type: String,
        enum: ["hourly", "daily", "weekly", "monthly"]
    },
    lastEmailSent: {
        type: String,
        required: false,
        match: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,      
    }
}, { timestamps: true })

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema)

export default UserModel;
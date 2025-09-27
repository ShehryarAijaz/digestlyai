import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { env } from "@/lib/env"
import dbConnect from "@/lib/dbConnect";
import UserModel from "./models/user.model";
import EmailProvider from 'next-auth/providers/email';
import nodemailer from 'nodemailer';

export const authOptions: NextAuthOptions = {
    debug: true,
    providers:[
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
        // EmailProvider({
        //     server: {
        //         host: env.EMAIL_SERVER_HOST,
        //         port: env.EMAIL_SERVER_PORT,
        //         auth: {
        //             user: env.EMAIL_SERVER_USER,
        //             pass: env.EMAIL_SERVER_PASSWORD
        //         }
        //     },
        //     from: env.EMAIL_FROM
        // })
    ],
    secret: env.AUTH_SECRET,
    pages: {
        signIn: '/login',
    },

    session: { strategy: "jwt" },

    callbacks: {
        async signIn({ user }) {
            
            try {
                await dbConnect()

                const existingUser = await UserModel.findOne({ email: user.email })
                if (!existingUser) {
                    await UserModel.create({
                        username: user.name,
                        email: user.email,
                        isVerified: true,
                        frequency: "daily",
                    })
                    console.log('New user created:', user.email);
                } else {
                    console.log('Existing user found:', user.email);
                }

                return true;
            } catch (error) {
                console.error('SignIn callback error:', error);
                // Allow sign in even if database operations fail
                return true;
            }
        },

        async jwt({ token, account }) {

            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = Date.now() + (account.expires_in as number) * 1000;
            }
            return token;
        },

        async session({ session, token }) {
            
            session.user = session.user || {};
            session.accessToken = token.accessToken as string;
            return session;
        }
    }

}
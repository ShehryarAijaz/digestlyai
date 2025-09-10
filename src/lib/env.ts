import { z } from "zod";

export const envSchema = z.object({
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    AUTH_SECRET: z.string(),
    MONGODB_URI: z.string(),
    MONGODB_DB_NAME: z.string(),
    NEXTAUTH_URL: z.string(),
});

export const env = envSchema.parse(process.env);
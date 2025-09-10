"use client"

import React from "react";
import { SessionProvider } from "next-auth/react";

export default function AuthContext({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider
            refetchInterval={5 * 60}
            refetchOnWindowFocus={false}
            refetchWhenOffline={false}
        >
            {children}
        </SessionProvider>
    );
}
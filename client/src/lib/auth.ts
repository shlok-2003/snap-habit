import axios from "axios";
import NextAuth, { type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SIGN_UP_BACKEND_URL } from "./constants";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],
    pages: {
        signIn: "/auth/sign-in",
    },
    callbacks: {
        signIn: async ({ user, profile }) => {
            if (!profile?.email) {
                return false;
            }

            try {
                await axios.post(SIGN_UP_BACKEND_URL, {
                    email: profile.email,
                    name: profile.name,
                    image: user.image,
                });

                return true;
            } catch (error) {
                console.error("Error creating or fetching user:", error);
                return false;
            }
        },
    },
} satisfies NextAuthConfig);

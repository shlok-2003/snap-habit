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
            console.log({
                user: user,
                profile: profile,
            });

            if (!profile?.email) {
                return false;
            }

            const createUser = await axios.post(SIGN_UP_BACKEND_URL, {
                email: profile.email,
                name: profile.name,
                image: user.image
            });

            if (createUser.status === 200) {
                return true;
            }

            return false;
        },
    },
} satisfies NextAuthConfig);

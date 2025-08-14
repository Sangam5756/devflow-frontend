import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { User, Session } from "next-auth";
import axios from "axios";
import { API_URL } from "@/constants/api";

export const NEXT_AUTH_CONFIG = {
    providers: [
        CredentialsProvider({
            name: 'Credential',
            credentials: {
                email: { label: 'email', type: 'text', placeholder: '' },
                password: { label: 'password', type: 'password', placeholder: '' },

            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string };

                try {
                    const res = await axios.post(API_URL + "/user/login", { email, password });
                    const data = res.data;

                    if (data.error) {
                        return null;
                    }

                    return {
                        id: data.data._id,
                        name: data.data.username,
                        email: data.data.email,
                        bio: data.data.bio,

                    };
                } catch (error) {
                    console.error("Login error:", error);
                    return null;
                }



            }
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }: { user?: User & { id?: string; userId?: string }; token: JWT }) => {
            if (user) {
                token.uid = user.id,
                    token.accessToken = (user as any).accessToken

            }
            return token;
        },
        session: ({ session, token }: { session: Session & { user: { id?: string } }; token: JWT }) => {
            if (session.user) {
                session.user.id = token.uid as string;
            }
            (session as any).accessToken = token.accessToken;
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },

};

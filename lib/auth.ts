import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { User, Session } from "next-auth";
import axios from "axios";
import { API_URL } from "@/constants/api";

// Define custom interfaces to extend NextAuth types
interface ExtendedUser extends User {
    bio?: string;
    accessToken?: string;
}

interface ExtendedToken extends JWT {
    uid?: string;
    accessToken?: string;
}

interface ExtendedSession extends Session {
    accessToken?: string;
    user?: {
        id?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

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
        jwt: async ({ user, token }: { user?: User; token: JWT }) => {
            if (user) {
                const extendedToken = token as ExtendedToken;
                const extendedUser = user as ExtendedUser;
                
                extendedToken.uid = user.id;
                extendedToken.accessToken = extendedUser.accessToken;
            }
            return token;
        },
        session: ({ session, token }: { session: Session; token: JWT }) => {
            const extendedSession = session as ExtendedSession;
            const extendedToken = token as ExtendedToken;
            
            if (extendedSession.user) {
                extendedSession.user.id = extendedToken.uid;
            }
            extendedSession.accessToken = extendedToken.accessToken;
            
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
};
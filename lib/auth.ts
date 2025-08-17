import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { User, Session, Account } from "next-auth";
import axios from "axios";
import { API_URL } from "@/constants/api";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
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
                    const res = await axios.post(API_URL + "/user/login", { email, password }, {
                        withCredentials: true
                    });
                    const data = res.data;

                    if (data.error) {
                        throw new Error(data.message || "Invalid credentials");
                    }

                    return {
                        id: data.data._id,
                        name: data.data.username,
                        email: data.data.email,
                        bio: data.data.bio,
                        accessToken: data.token
                    };
                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        throw new Error(err.response?.data?.message || "Login failed");
                    }
                    throw new Error("Login failed");
                }
            }


        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token, account }: { user?: User; token: JWT, account: Account | null; }) => {

            if (account && (account.provider === "google" || account.provider === "github")) {
                try {
                    const tokenToSend = account.provider === "google" ? account.id_token : account.access_token;
                    console.log("tokenToSend", tokenToSend)
                    const res = await axios.post(`${API_URL}/user/oauth/login`, {
                        provider: account.provider,
                        token: tokenToSend,
                    });
                    const data = res.data;
                    console.log("OAuth response data:", data);
                    token.uid = data.data._id;
                    token.accessToken = data.token;
                    console.log("token in oauth", token);

                    token.name = data.data.username;
                    token.email = data.data.email;
                    token.picture = token.picture;


                    (token as any).user = {
                        id: data.data._id,
                        name: data.data.username,
                        email: data.data.email,
                        bio: data.data.bio,
                    };

                    console.log("token after OAuth setup:", token);
                } catch (error) {
                    console.error("OAuth login error:", error);
                    // Handle error appropriately
                    return token;
                }
            }



            if (user && !account) {
                // This is for credentials login
                const extendedUser = user as ExtendedUser;
                token.uid = user.id;
                token.accessToken = extendedUser.accessToken;
            } else if (user && account && account.provider === "credentials") {
                const extendedUser = user as ExtendedUser;
                token.uid = user.id;
                token.accessToken = extendedUser.accessToken;
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
            console.log("token in session", session)

            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
};
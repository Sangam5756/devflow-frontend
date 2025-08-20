'use server'
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";


export interface ExtendedToken {
    uid?: string;
    accessToken?: string | null;
    expires:string
}



export async function useServerSession() {
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    const extendedSession = session as ExtendedToken;
    return extendedSession;

}
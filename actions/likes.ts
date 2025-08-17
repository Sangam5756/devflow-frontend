'use server';

import axios from "axios";
import { API_URL } from "@/constants/api";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export interface ExtendedToken {
    uid?: string;
    accessToken?: string;
}
type TargetType = "Question" | "Answer";

export async function likeTarget(targetId: string, targetType: TargetType, action: string) {

    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const extendedSession = session as ExtendedToken;

    if (action === 'like') {
        try {
            const res = await axios.post(
                `${API_URL}/like/like/${targetType}/${targetId}`,
                {},
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${extendedSession.accessToken}`
                    }
                }
            );

            return res.data;
        } catch (err) {
            console.error(err);
        }
    } else {

        try {
            const res = await axios.post(
                `${API_URL}/like/dislike/${targetType}/${targetId}`,
                {},
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${extendedSession.accessToken}`
                    }
                }
            );

            return res.data;
        } catch (err) {
            console.error(err);
        }

    }
}

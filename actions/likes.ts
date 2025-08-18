'use server';

import axios from "axios";
import { API_URL } from "@/constants/api";
import { useServerSession } from "@/hooks/useServerSession";


type TargetType = "Question" | "Answer";

export async function likeTarget(targetId: string, targetType: TargetType, action: string) {

    const session = await useServerSession();
    
    if (action === 'like') {
        try {
            const res = await axios.post(
                `${API_URL}/like/like/${targetType}/${targetId}`,
                {},
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
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
                        Authorization: `Bearer ${session.accessToken}`
                    }
                }
            );

            return res.data;
        } catch (err) {
            console.error(err);
        }

    }
}

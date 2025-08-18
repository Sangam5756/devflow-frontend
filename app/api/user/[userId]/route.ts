
import { API_URL } from "@/constants/api";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ExtendedToken } from "@/hooks/useServerSession";

interface APIErrorResponse {
    message: string;
    error?: boolean;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;

    const session = await getServerSession();
    const extendedSession = session as ExtendedToken;
    try {
        const res = await axios.get(`${API_URL}/user/${userId}`, { headers: { Authorization: `Bearer ${extendedSession.accessToken}` } });
        const data = res.data;

        return NextResponse.json({
            data: data
        });

    } catch (err) {
        const error = err as AxiosError<APIErrorResponse>;

        return NextResponse.json(
            {
                message: error.response?.data?.message ?? "Unknown error",
                error: true
            },
            {
                status: error.response?.status ?? 500
            }
        );
    }
};
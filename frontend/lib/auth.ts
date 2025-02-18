'use server';
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const secretKey = process.env.NEXT_PUBLIC_COOKIE_ENCRYPTION_KEY || "my-secret-key";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7 days from now")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function login(formData: FormData) {
    // Verify credentials && get the user

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/token`,
            formData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
    
        if (response.status === 200 && response.data.access_token) {
            // Save the session in a cookie
            (await cookies()).set("session", response.data.access_token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
        }
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        return null;
    }
}

export async function logout() {
    // Destroy the session
    (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function getSession() {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function getRawSession() {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;
    return session;
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/refresh-token`,
            {
                headers: {
                    Authorization: `Bearer ${session}`,
                },
            }
        );

        if (response.status === 200 && response.data.access_token) {
            // Update the session in the cookie
            (await cookies()).set("session", response.data.access_token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
        }
        const res = NextResponse.next();
        // res.headers.set("Set-Cookie", `session=${response.data.access_token}; HttpOnly;`);
        return res;
    } catch (error) {
        console.error("Error refreshing session:", error);
    }
}
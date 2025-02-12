import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
var CryptoJS = require('crypto-js');

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_COOKIE_ENCRYPTION_KEY || "my-secret-key";

export function middleware(req: NextRequest) {
  const authCookie = req.cookies.get("authData")?.value;
  
  // If there is no cookie, redirect to the login page
  if (!authCookie) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  try {
    // Decrypt the cookie value
    const bytes = CryptoJS.AES.decrypt(authCookie, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    // Parse the decrypted string to JSON
    const authData = JSON.parse(decrypted);

    // Check if the accessToken exists in the decrypted data
    if (!authData || !authData.accessToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (error) {
    console.error("Middleware decryption error:", error);
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // If the cookie is valid, continue processing the request
  return NextResponse.next();
}

// Define which routes are protected
export const config = {
  matcher: ["/bids/:path*"],
};

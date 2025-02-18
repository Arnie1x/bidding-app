import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const res = await updateSession(req);
  
  // If there is no cookie, redirect to the login page
  if (!res) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  // If the cookie is valid, continue processing the request
  return res;
}

// Define which routes are protected
export const config = {
  matcher: ["/bids/:path*"],
};

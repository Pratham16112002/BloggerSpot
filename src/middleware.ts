import { NextRequest, NextResponse } from "next/server";
import { getSession, logout } from "./actions";
import { verifyToken } from "./lib/auth";

export default async function middleware(req: NextRequest) {
  const session = await getSession();
  const token = session.token;
  const verifiedToken = token && (await verifyToken(token));
  if (req.nextUrl.pathname.startsWith("/user/login") && !verifiedToken) {
    return;
  }
  if (req.url.includes("/user/login") && verifiedToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/blogs";
    return NextResponse.rewrite(url);
  }
  if (!verifiedToken) {
    await logout();
    const url = req.nextUrl.clone();
    url.pathname = "/user/login";
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: ["/blog", "/user/login", "/blog/:path*"],
};

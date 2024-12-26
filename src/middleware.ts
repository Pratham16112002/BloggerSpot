import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./actions";
import { verifyToken } from "./lib/auth";

const publicRoutes = ["/user/login", "/user/register"];
const privateRoutes = ["/blog", "/blog/:path*", "/"];

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const session = await getSession();
  if (session.isLoggedIn == false) {
    url.pathname = "/user/login";
    return NextResponse.rewrite(url);
  }
  const verifiedToken = await verifyToken(session.token);
  const path = req.nextUrl.pathname;
  console.log(verifiedToken);
  if (verifiedToken.verified == false && privateRoutes.includes(path)) {
    session.destroy();
    url.pathname = "/user/login";
    return NextResponse.rewrite(url);
  }
  if (verifiedToken.verified == true && publicRoutes.includes(path)) {
    url.pathname = "/blog";
    return NextResponse.rewrite(url);
  }

  // if (req.nextUrl.pathname.startsWith("/user/login") && !verifiedToken) {
  //   return;
  // }
  // if (req.url.includes("/user/login") && verifiedToken) {
  //   return NextResponse.rewrite(new URL("/blog", req.url));
  // }
  // if (!verifiedToken) {
  //   await logout();
  //   return NextResponse.rewrite(new URL("/user/login", req.url));
  // }
}

export const config = {
  matcher: ["/blog", "/user/login", "/blog/:path*", "/"],
};

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./actions";
import { verifyToken } from "./lib/auth";
import { privateRoutes, publicRoutes } from "./util/route";

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const session = await getSession();
  if (session.isLoggedIn == false) {
    url.pathname = "/user/login";
    return NextResponse.rewrite(url);
  }
  const verifiedToken = await verifyToken(session.token);
  const path = req.nextUrl.pathname;
  if (verifiedToken.verified == false && privateRoutes.includes(path)) {
    session.destroy();
    url.pathname = "/user/login";
    return NextResponse.redirect(url);
  }
  if (verifiedToken.verified == true && publicRoutes.includes(path)) {
    url.pathname = "/blog";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/blog", "/user/login", "/blog/:path*", "/blog/add"],
};

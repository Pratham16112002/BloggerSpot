import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./actions";
import { privateRoutes } from "./util/route";

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const session = await getSession();
  const path = req.nextUrl.pathname;
  if (session.isLoggedIn == false && privateRoutes.includes(path)) {
    url.pathname = "/user/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/blog", "/user/login", "/blog/:path*", "/blog/add"],
};

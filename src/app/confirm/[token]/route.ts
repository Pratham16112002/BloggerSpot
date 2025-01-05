import axiosConfig from "../../../axios/axiosConfig";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const token = (await params).token;
  const url = request.nextUrl;
  try {
    await axiosConfig.put(`users/activate/${token}`);
    url.pathname = "/confirm";
    return NextResponse.redirect(url);
  } catch {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}

import axiosConfig from "../../../axios/axiosConfig";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const token = (await params).token;
  try {
    await axiosConfig.put(`users/activate/${token}`);
    return NextResponse.json({ message: "User activated successfully" });
  } catch {
    return NextResponse.error();
  }
}

import { getSession } from "@/actions";
import axiosConfig from "@/axios/axiosConfig";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const limit = parseInt(request.nextUrl.searchParams.get("limit") ?? "6");
  const offset = parseInt(request.nextUrl.searchParams.get("offset") ?? "0");
  const search = request.nextUrl.searchParams.get("search");
  const role = request.nextUrl.searchParams.get("role");
  const session = await getSession();
  try {
    const api_response = await axiosConfig.get(
      `users/friends?limit=${limit}&offset=${offset}&search=${search}&role=${role}`,
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    return NextResponse.json({
      data: api_response.data.data,
      success: true,
      error: undefined,
      status: api_response.status,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json({
        data: undefined,
        success: false,
        error: error.response?.data.error,
        status: error.status,
      });
    } else {
      return NextResponse.json({
        data: undefined,
        success: false,
        error: "something went wrong",
        status: 500,
      });
    }
  }
}

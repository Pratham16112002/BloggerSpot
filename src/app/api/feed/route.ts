import { getSession, logout } from "@/actions";
import axiosConfig from "@/axios/axiosConfig";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const limit = parseInt(request.nextUrl.searchParams.get("limit") ?? "10");
  const offset = parseInt(request.nextUrl.searchParams.get("offset") ?? "0");
  const search = request.nextUrl.searchParams.get("search");
  const sort = request.nextUrl.searchParams.get("sort") as "asec" | "desc";
  const tags = request.nextUrl.searchParams.get("tags") ?? "";
  const session = await getSession();
  try {
    const api_response = await axiosConfig.get(
      `users/feed?limit=${limit}&offset=${offset}&sort=${sort}&tags=${tags}&search=${search}`,
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
      if (error.status == 401) {
        await logout();
        return NextResponse.redirect("/user/login");
      } else if (error.status == 403) {
        await logout();
        return NextResponse.redirect("/user/login");
      } else {
        return NextResponse.json({
          data: undefined,
          success: false,
          error: error.response?.data.error,
          status: error.status,
        });
      }
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

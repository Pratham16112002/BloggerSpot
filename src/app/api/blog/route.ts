import { getSession, logout } from "@/actions";
import axiosConfig from "@/axios/axiosConfig";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await getSession();
  try {
    const api_response = await axiosConfig.post(`posts`, await request.json(), {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
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

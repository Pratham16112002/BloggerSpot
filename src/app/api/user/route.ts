import axiosConfig from "../../../axios/axiosConfig";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const payload = await request.json();
  try {
    const api_response = await axiosConfig.post(`authentication/user`, payload);
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

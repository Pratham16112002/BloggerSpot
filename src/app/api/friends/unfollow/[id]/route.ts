import { getSession } from "@/actions";
import axiosConfig from "@/axios/axiosConfig";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const id = (await params).id;
  const session = await getSession();
  try {
    const api_response = await axiosConfig.put(`users/${id}/unfollow`, {
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

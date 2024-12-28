import { getSession, logout } from "@/actions";
import axiosConfig from "@/axios/axiosConfig";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
): Promise<NextResponse> {
  const { id } = await params;
  const session = await getSession();
  try {
    const api_response = await axiosConfig.get(`posts/${id}`, {
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
        return NextResponse.json({
          data: undefined,
          success: false,
          error: error.response?.data.error,
          status: error.status,
        });
      } else if (error.status == 403) {
        await logout();
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
): Promise<NextResponse> {
  const session = await getSession();
  const { id } = await params;
  try {
    const api_response = await axiosConfig.patch(
      `posts/${id}`,
      await request.json(),
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
        return NextResponse.json({
          data: undefined,
          success: false,
          error: error.response?.data.error,
          status: error.status,
        });
      } else if (error.status == 403) {
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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
): Promise<NextResponse> {
  const session = await getSession();
  const { id } = await params;
  try {
    const api_response = await axiosConfig.post(
      `posts/${id}/comments`,
      await request.json(),
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
        return NextResponse.json({
          data: undefined,
          success: false,
          error: error.response?.data.error,
          status: error.status,
        });
      } else if (error.status == 403) {
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

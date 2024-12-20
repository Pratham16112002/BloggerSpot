import axiosConfig from "@/axios/axiosConfig";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const token = (await params).token;
  if ((await axiosConfig.put(`users/activate/${token}`)).status == 204) {
    redirect("/confirm");
  } else {
    redirect("/");
  }
}

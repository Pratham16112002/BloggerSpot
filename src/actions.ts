"use server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "./lib";
import { cookies } from "next/headers";
import axiosConfig from "./axios/axiosConfig";
import axios from "axios";
import { ApiResponse } from "../types";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  }
  return session;
};
export const login: (credentails: {
  email: string;
  password: string;
}) => Promise<ApiResponse> = async (credentails) => {
  try {
    const response = await axiosConfig.post(
      "authentication/token",
      credentails
    );
    const session = await getSession();
    session.token = response.data.data;
    session.isLoggedIn = true;
    await session.save();
    return {
      success: true,
      data: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: null,
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  }
};
export const logout = async () => {
  const session = await getSession();
  session.destroy();
};

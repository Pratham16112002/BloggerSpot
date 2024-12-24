import { SessionOptions } from "iron-session";

export interface SessionData {
  token: string;
  userId: number | undefined;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  userId: undefined,
  isLoggedIn: false,
  token: "",
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

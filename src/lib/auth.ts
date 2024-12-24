import { getSession, logout } from "@/actions";
import { jwtVerify, SignJWT } from "jose";

interface UserJwtPayload {
  exp: number;
  iat: number;
  iss: string;
  nbf: number;
  sub: number | undefined;
}

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret || secret.length === 0) {
    throw new Error("Token is not set");
  }
  return secret;
};

export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey()),
      {
        issuer: process.env.JWT_ISS,
        audience: process.env.JWT_ISS,
      }
    );
    const session = await getSession();
    if (verified.payload.sub) {
      session.userId = +verified.payload.sub;
      (session.isLoggedIn = true), (session.token = token);
      await session.save();
    } else {
      await logout();
      throw new Error("Token does not belongs");
    }
    return verified.payload as UserJwtPayload;
  } catch (error) {
    throw new Error("Some error occured, token could not be verified");
  }
}

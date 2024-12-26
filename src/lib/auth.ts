// import { getSession, logout } from "@/actions";
import { jwtVerify } from "jose";
import { JWTExpired, JWTInvalid } from "jose/errors";

// interface UserJwtPayload {
//   exp: number;
//   iat: number;
//   iss: string;
//   nbf: number;
//   sub: number | undefined;
// }

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret || secret.length === 0) {
    throw new Error("Token is not set");
  }
  return secret;
};

export async function verifyToken(token: string): Promise<{
  userId: number | null;
  verified: boolean;
  validationError?: string;
}> {
  try {
    console.log(token);
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey()),
      {
        issuer: process.env.JWT_ISS,
        audience: process.env.JWT_ISS,
      }
    );
    if (!payload.sub) {
      return {
        userId: null,
        verified: false,
        validationError: "Token is invalid",
      };
    }
    return {
      userId: +payload.sub,
      verified: true,
    };
  } catch (error) {
    if (error instanceof JWTExpired) {
      return {
        userId: null,
        verified: false,
        validationError: "Token is expired",
      };
    } else if (error instanceof JWTInvalid) {
      return {
        userId: null,
        verified: false,
        validationError: "Token is invalid",
      };
    } else {
      throw new Error("Something went wrong");
    }
  }
  // const verified = await jwtVerify(
  //   token,
  //   new TextEncoder().encode(getJwtSecretKey()),
  //   {
  //     issuer: process.env.JWT_ISS,
  //     audience: process.env.JWT_ISS,
  //   }
  // );
  // const session = await getSession();
  // if (verified.payload.sub) {
  //   session.userId = +verified.payload.sub;
  //   session.isLoggedIn = true;
  //   session.token = token;
  //   await session.save();
  // } else {
  //   await logout();
  //   throw new Error("Token does not belongs");
  // }
}

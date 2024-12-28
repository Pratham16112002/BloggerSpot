import { getSession } from "@/actions";
import React from "react";
import AuthNavContent from "./Nav/AuthNavContent";

async function AuthNavBarContent() {
  const session = await getSession();
  return <AuthNavContent isLoggedIn={session.isLoggedIn} />;
}

export default AuthNavBarContent;

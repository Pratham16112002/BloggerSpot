import { getSession } from "@/actions";
import React from "react";
import AuthNavBarContent from "./Nav/AuthNavContent";
import NoAuthNavBarContent from "./Nav/NavContent";

export default async function NavBar() {
  const session = await getSession();
  console.log(session);
  if (session.isLoggedIn) {
    return <AuthNavBarContent />;
  }
  return <NoAuthNavBarContent />;
}

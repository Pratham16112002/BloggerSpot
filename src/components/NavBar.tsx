import { getSession } from "@/actions";
import NavBarContent from "./Nav/NavContent";
import React from "react";

export default async function NavBar() {
  const session = await getSession();
  return <NavBarContent isAuthenticated={session.isLoggedIn} />;
}

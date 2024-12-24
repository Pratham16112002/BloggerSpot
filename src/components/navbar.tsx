import { getSession } from "@/actions";
import React from "react";
import NavBarContent from "./Nav/navContent";

export default async function NavBar() {
  const session = await getSession();
  return <NavBarContent isAuthenticated={session.isLoggedIn} />;
}

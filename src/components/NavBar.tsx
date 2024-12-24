import { getSession } from "@/actions";
import NavBarContent from "./Nav/NavContent";

export default async function NavBar() {
  const session = await getSession();
  return <NavBarContent isAuthenticated={session.isLoggedIn} />;
}

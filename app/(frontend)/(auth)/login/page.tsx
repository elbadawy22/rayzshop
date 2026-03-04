import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/auth/currentUser";
import { UserProfile } from "../../lib/taypes";
import LoginPage from "./LoginPage";

export default async function page() {
  const user: UserProfile = await getCurrentUser();
  if (user) {
    redirect("/");
  }
  return <LoginPage />;
}

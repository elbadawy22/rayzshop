import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/auth/currentUser";
import { UserProfile } from "../../lib/taypes";
import RegisterPage from "./RegisterPage";

export default async function page() {
  const user: UserProfile = await getCurrentUser();
  if (user) {
    redirect("/");
  }
  return <RegisterPage />;
}

import { redirect, RedirectType } from "next/navigation";
import { getCurrentUser } from "../../lib/auth/currentUser";
import { UserProfile } from "../../lib/taypes";
import UsersManagementPage from "./UsersManagementPage"; 

const UsersManage = async () => {
    const user: UserProfile = await getCurrentUser();
  
    if (user?.role !== "ADMIN") {
      redirect("/unauthorized", "replace" as RedirectType);
    }
  return <UsersManagementPage />;
};

export default UsersManage;

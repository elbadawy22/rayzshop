import { redirect, RedirectType } from "next/navigation";
import { getCurrentUser } from "../../lib/auth/currentUser";
import { UserProfile } from "../../lib/taypes";
import UsersManagementPage from "./OrdersManagementPage"; 

const UsersManage = async () => {
    const user: UserProfile = await getCurrentUser();
  
    if (user?.role === "ADMIN" || user?.role === "ORDER_MANAGER") {
    } else {
      redirect("/unauthorized", "replace" as RedirectType);
    }
  return <UsersManagementPage />;
};

export default UsersManage;

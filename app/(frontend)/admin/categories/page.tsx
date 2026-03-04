import { redirect, RedirectType } from "next/navigation";
import { getCurrentUser } from "../../lib/auth/currentUser";
import { UserProfile } from "../../lib/taypes";
import CategoryManagementPage from "./CategoryManagementPage"; 

const UsersManage = async () => {
    const user: UserProfile = await getCurrentUser();
  
    if (user?.role === "ADMIN" || user?.role === "PRODUCTS_MANAGER") {
    } else {
      redirect("/unauthorized", "replace" as RedirectType);
    }
  return <CategoryManagementPage />;
};

export default UsersManage;

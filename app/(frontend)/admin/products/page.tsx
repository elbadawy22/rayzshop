import { redirect, RedirectType } from "next/navigation";
import { getCurrentUser } from "../../lib/auth/currentUser";
import { UserProfile } from "../../lib/taypes";
import ProductManagementPage from "./ProductManagementPage";

const UsersManage = async () => {
  const user: UserProfile = await getCurrentUser();
  if (user?.role === "ADMIN" || user?.role === "PRODUCTS_MANAGER") {
    return <ProductManagementPage />;
  } else {
    redirect("/unauthorized", "replace" as RedirectType);
  }
};

export default UsersManage;

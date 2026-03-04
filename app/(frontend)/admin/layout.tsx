import React from "react";
import { redirect, RedirectType } from "next/navigation";
import { UserProfile } from "../lib/taypes";
import { getCurrentUser } from "../lib/auth/currentUser";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: UserProfile = await getCurrentUser();

  if (
    user?.role === "ADMIN" ||
    user?.role === "PRODUCTS_MANAGER" ||
    user?.role === "ORDER_MANAGER"
  ) {
    return <main>{children}</main>;
  } else {
    redirect("/unauthorized", "replace" as RedirectType);
  }
}

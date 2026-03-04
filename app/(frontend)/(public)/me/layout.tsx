import React from "react";
import { redirect, RedirectType } from "next/navigation";
import { UserProfile } from "../../lib/taypes"; 
import { getCurrentUser } from "../../lib/auth/currentUser";

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: UserProfile = await getCurrentUser();

  if (!user ) {
    redirect("/login", "replace" as RedirectType);
  }

  return <main>{children}</main>;
}

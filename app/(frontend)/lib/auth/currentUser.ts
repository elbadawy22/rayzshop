import { cookies } from "next/headers";
import { getBaseUrl } from "../helper/fetcherBasUrl";

export async function getCurrentUser() {
  const cookie = await (await cookies()).toString();
  const res = await fetch((await getBaseUrl()) + "/api/auth/me", {
    cache: "no-store",
    headers: {
      cookies: cookie,
    },
  });
  if (!res.ok) {
    return null;
  }
  const { user } = await res.json().then((res) => res);
  return user;
}


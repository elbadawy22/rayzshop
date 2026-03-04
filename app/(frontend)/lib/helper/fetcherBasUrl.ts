import { headers } from "next/headers";

export async function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }
  const host = (await headers().then((res)=>res)).get("host");
//   const head = (await headers().then((res)=>res)).get("referer");
  return `http://${host}`
}

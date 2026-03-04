import { headers } from "next/headers";

export  function getBaseUrl() {

  const host = process.env.BASE_URL;
//   const head = (await headers().then((res)=>res)).get("referer");
  return host
}

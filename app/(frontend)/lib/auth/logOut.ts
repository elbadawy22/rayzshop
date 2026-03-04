import { getBaseUrl } from "../helper/fetcherBasUrl";

export async function logOut() {

  await fetch( "/api/auth/logout", {
    method: "POST",
  });
}
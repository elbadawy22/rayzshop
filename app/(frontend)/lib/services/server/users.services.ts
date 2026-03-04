import { cookies } from "next/headers";
import { getBaseUrl } from "../../helper/fetcherBasUrl";
import { SearchParamsProducts } from "../../taypes";

export const getUsers = async () => {
  const cookie = await (await cookies()).toString();

  const urlReq = (await getBaseUrl()) + "/api/admin/users";

  const fetchData = await fetch(urlReq, {
    credentials: "include",
       headers: {
      cookies: cookie,
    },
  });

  return fetchData;
};

export const getProducts = async (params: SearchParamsProducts) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.append(key, value);
    }
  });
  const urlReq = (await getBaseUrl()) + "/api/product?" + query.toString();
  const fetchData = await fetch(urlReq, {
    cache: "no-store",
  });
  return fetchData;
};

export const getUser = async (id: string) => {
  const cookie = await (await cookies()).toString();

  const urlReq = (await getBaseUrl()) + "/api/admin/users/" + id.toString();
  const fetchData = await fetch(urlReq, {
    cache: "no-store",
    headers: {
      cookies: cookie,
    },
  });
  return fetchData;
};

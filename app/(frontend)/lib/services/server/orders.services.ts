import { cookies } from "next/headers";
import { getBaseUrl } from "../../helper/fetcherBasUrl";

export const getOrdrs = async () => {
  const cookie = await (await cookies()).toString();

  const urlReq = (await getBaseUrl()) + "/api/order/" 

  const fetchData = await fetch(urlReq, {
    credentials: "include",
       headers: {
      cookies: cookie,
    },
  });

  return fetchData;
};


export const getOrder = async (id: string) => {
  const cookie = await (await cookies()).toString();

  const urlReq = (await getBaseUrl()) + "/api/order/" + id.toString();
  const fetchData = await fetch(urlReq, {
    cache: "no-store",
        headers: {
      cookies: cookie,
    },
  });
  return fetchData;
};

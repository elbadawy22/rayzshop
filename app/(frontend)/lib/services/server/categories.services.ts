import { cookies } from "next/headers";
import { getBaseUrl } from "../../helper/fetcherBasUrl";
export async function getCategories() {
  const res = await fetch((await getBaseUrl()) + "/api/category", {
    cache: "no-store"
  });
  if (!res.ok) {
    console.log(await res.json());
    return null;
  }
  const { data }  = await res.json().then((res) => res);  
  return data;
}



export const getCategory = async (id: string) => {
  const cookie = await (await cookies()).toString();

  const urlReq = (await getBaseUrl()) + "/api/category/" + id.toString();
  const fetchData = await fetch(urlReq, {
    cache: "no-store",
        headers: {
      cookies: cookie,
    },
  });
  return fetchData;
};
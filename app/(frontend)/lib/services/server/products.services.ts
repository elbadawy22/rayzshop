import { getBaseUrl } from "../../helper/fetcherBasUrl";
import { SearchParamsProducts } from "../../taypes";

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

export const getProduct = async (id: string) => {

  const urlReq = (await getBaseUrl()) + "/api/product/" + id.toString();
  const fetchData = await fetch(urlReq, {
    cache: "no-store",
  });
  return fetchData;
};

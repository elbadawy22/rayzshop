import { NextResponse } from "next/server";
import {  ItemCart } from "../../taypes";

export const getorders = async (
  search: string,
  searchStatus: string,
  pageNum: number,
  searchCat: boolean,
) => {
  const isNumberSearch = parseInt(search);
  const query = new URLSearchParams();
  if (isNumberSearch) {
    query.append("phone", search);
    query.append("users", searchCat.toString());
  }
  searchStatus !== "" ? query.append("status", searchStatus) : "";
  pageNum > 1 ? query.append("pageNumber", pageNum.toString()) : "";
  const urlReq = "/api/order?" + query.toString();

  const fetchData = await fetch(urlReq);

  return fetchData;
};

export async function createNewOrder(items: ItemCart) {
  const deliveryAddress = items.deliveryAddress as string;
  const name = items.name as string;
  const phone = items.phone as string;
  const orderItems = items.orderItems;
  if (deliveryAddress && items.orderItems.length > 0) {
    const create = await fetch(`/api/order/ `, {
      method: "POST",
      body: JSON.stringify({ name, phone, deliveryAddress, orderItems }),
    });
    return create;
  }
  // return { message: "Requierd Inputs" };
  return NextResponse.json({ message: "Requierd Inputs" });
}

export async function updateOrder(formData: FormData, id: string) {
  const status = formData.get("status");
  const urlReq = "/api/order/" + id;

  if (status) {
    const update = await fetch(urlReq, {
      method: "PUT",
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .catch((err) => {
        err;
      });
    return update;
  }
  return { message: "Requierd Inputs" };
}

export async function deleteOrder(id: string) {
  const urlReq = "/api/order/" + id;

  const deleteuser = await fetch(urlReq, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((err) => {
      err;
    });
  return deleteuser;
}

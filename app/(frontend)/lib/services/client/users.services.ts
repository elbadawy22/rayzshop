import { NextResponse } from "next/server";

export const getUsers = async (
  search: string,
  searchRole: string,
  pageNum: number,
) => {
  const isNumberSearch = parseInt(search);
  const query = new URLSearchParams();
 
    isNumberSearch
      ? query.append("phone", search)
      : query.append("search", search)

  searchRole !== "" ? query.append("role", searchRole) : "";
  pageNum > 1 ? query.append("pageNumber", pageNum.toString()) : "";
  const urlReq = "/api/admin/users?" + query.toString();

  const fetchData = await fetch(urlReq);

  return fetchData;
};

export async function createNewUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;
  if (name && email && phone && password && role) {
    const create = await fetch(`/api/admin/users `, {
      method: "POST",
      body: JSON.stringify({ name, email, phone, password, role }),
    })
    return create;
  }
  // return { message: "Requierd Inputs" };
  return NextResponse.json({message:"Requierd Inputs"})
}

export async function updateUser(formData: FormData, id: string) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const password = formData.get("password");
  const role = formData.get("role");

  const urlReq = "/api/admin/users/" + id;

  if (name || phone || password || role) {
    const update = await fetch(urlReq, {
      method: "PUT",
      body: JSON.stringify({ name, phone, password, role }),
    })
      .then((res) => res.json())
      .catch((err) => {
        err;
      });
    return update;
  }
  return { message: "Requierd Inputs" };
}

export async function deleteUser( id: string) {
 
  const urlReq = "/api/admin/users/" + id;

    const deleteuser = await fetch(urlReq, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => {
        err;
      });
    return deleteuser;
}

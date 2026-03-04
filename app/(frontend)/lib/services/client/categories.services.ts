import { NextResponse } from "next/server";
export async function createNewCategory(formData: FormData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const image = formData.get("image");

  formData.append("stock", "1");

  if (name && description && image) {
    const create = await fetch("/api/category", {
      method: "POST",
      body: formData,
    });
    return create;
  }
  // return { message: "Requierd Inputs" };
  return NextResponse.json({ message: "Requierd Inputs" });
}

// ################################################################

export const getCategories = async (search: string, pageNum: number) => {
  const query = new URLSearchParams();

  query.append("search", search);

  pageNum > 1 ? query.append("pageNumber", pageNum.toString()) : "";
  const urlReq = "/api/category?" + query.toString();

  const fetchData = await fetch(urlReq);

  return fetchData;
};
// ################################################################
export async function updateCategory(formData: FormData, id: string) {
  const name = formData.get("name");
  const description = formData.get("description");
  const image = formData.get("image");
  const body = new FormData();
  if (name) {
    body.append("name", name);
  }
  if (description) {
    body.append("description", description);
  }
  if (image) {
    body.append("image", image);
  }
  const urlReq = "/api/category/" + id;
  if (name || description || image) {
    const update = await fetch(urlReq, {
      method: "PUT",
      body: body,
    })
      .then((res) => res.json())
      .catch((err) => {
        err;
      });
    return update;
  }
  return { message: "Requierd Inputs" };
}
// ################################################################

export async function deleteCategory(id: string) {
  const urlReq = "/api/category/" + id;

  const deleteuser = await fetch(urlReq, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((err) => {
      err;
    });
  return deleteuser;
}

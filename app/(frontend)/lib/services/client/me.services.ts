export async function updateProfile(formData: FormData) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const password = formData.get("password");

  const urlReq = "/api/auth/me" ;

  if (name || phone || password ) {
    const update = await fetch(urlReq, {
      method: "PUT",
      body: JSON.stringify({ name, phone, password}),
    })
      .then((res) => res.json())
      .catch((err) => {
        err;
      });
    return update;
  }
  return { message: "Requierd Inputs" };
}
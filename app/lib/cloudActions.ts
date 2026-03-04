import cloudinary from "@/app/lib/cloudinary";
interface CloudDots {
  asset_id: String;
  public_id: String;
  version: Number;
  version_id: String;
  signature: String;
  width: Number;
  height: Number;
  format: String;
  resource_type: String;
  created_at: String;
  tags: [];
  bytes: Number;
  type: String;
  etag: String;
  placeholder: Boolean;
  url: String;
  asset_folder: String;
  display_name: String;
  original_filename: String;
  api_key: String;
}
export async function uploadCloud(file: File, folderName: string) {
  if (!file) {
    return null;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const folder =
    folderName == "category"
      ? "ecommerce-categories"
      : folderName == "user"
        ? "ecommerce-users"
        : folderName == "product"
          ? "ecommerce-products"
          : "";
  const upload = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: folder }, (err, result) => {
        if (err) null;
        else resolve(result);
      })
      .end(buffer);
  });
  const urlReturn = upload as CloudDots;
  return { url: urlReturn.url, public_id: urlReturn.public_id };
}

export async function deleteCloud(publicId: string) {
  if (!publicId) {
    return false;
  }

  await cloudinary.uploader.destroy(publicId);

  return true;
}

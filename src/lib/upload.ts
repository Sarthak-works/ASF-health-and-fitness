export async function uploadImage(file: File): Promise<string> {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
  if (!cloud || !preset) throw new Error("Cloudinary env vars are missing");

  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", preset);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
    { method: "POST", body: fd },
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.secure_url) {
    // Cloudinary returns { error: { message } } on failure
    throw new Error(data?.error?.message || `Image upload failed (HTTP ${res.status})`);
  }
  return data.secure_url;
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/utils/uploadImage";

export async function updateCategory(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const oldImageUrl = formData.get("oldImageUrl") as string;
  const imageFile = formData.get("image") as File | null;

  const updateData: {
    name: string;
    image?: string;
  } = { name };

  if (imageFile && imageFile.size > 0) {
    updateData.image = await uploadImage({
      file: imageFile,
      table: "categories",
      path: "category-images",
      oldImageUrl,
    });
  }

  const { error } = await supabase
    .from("categories")
    .update(updateData)
    .eq("id", id);

  if (error?.code === "23505") {
    throw new Error("A category with the same name already exists");
  }

  if (error) throw error;

  return { success: true };
}

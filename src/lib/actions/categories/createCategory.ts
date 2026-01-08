"use server";

import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/uploadImage";

export async function createCategory(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const imageFile = formData.get("image") as File | null;

  let imageUrl: string | null = null;

  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadImage({file: imageFile, table: "categories", path: "category-images"});
  }

  const { error } = await supabase
    .from("categories")
    .insert({
      name,
      image: imageUrl,
    });

  if (error) throw error;
}

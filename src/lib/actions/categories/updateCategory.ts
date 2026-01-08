"use server";

import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/uploadImage";
import { redirect } from "next/navigation";

type UpdateCategoryState = {
  error: string | null;
};

export async function updateCategory(
  prevState: UpdateCategoryState,
  formData: FormData
): Promise<UpdateCategoryState> {
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

  if (error) {
    console.error(error);
    return { error: error.message };
  }

  redirect("/dashboard/categories?updated=true");
}

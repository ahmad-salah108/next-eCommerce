"use server";

import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/utils/uploadImage";

export async function updateProduct(formData: FormData) {
  const supabase = await createClient();

  const productId = Number(formData.get("id"));

  /* -------------------- BASIC FIELDS -------------------- */

  const productData = {
    name: {
      en: formData.get("name_en"),
      ar: formData.get("name_ar"),
    },
    description: {
      en: formData.get("description_en"),
      ar: formData.get("description_ar"),
    },
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    slug: formData.get("slug"),
  };

  /* -------------------- MAIN IMAGE -------------------- */

  const oldImageUrl = formData.get("oldImageUrl") as string;
  const mainImage = formData.get("main_image") as File | null;
  let mainImageUrl;

  if (mainImage && mainImage.size > 0) {
    mainImageUrl = await uploadImage({
      file: mainImage,
      table: "products",
      path: "product-images",
      oldImageUrl,
    });
  }

  /* -------------------- IMAGES -------------------- */

  const keptImages: string[] = JSON.parse(
    (formData.get("kept_images") as string) || "[]",
  );

  const oldImages: string[] = JSON.parse(
    (formData.get("old_images") as string) || "[]",
  );

  // 2️⃣ Find deleted images
  const deletedImages = oldImages.filter((img) => !keptImages.includes(img));

  // 3️⃣ Remove deleted images from storage
  if (deletedImages.length) {
    const paths = deletedImages.map((url) => url.split("/products/")[1]);

    await supabase.storage.from("products").remove(paths);
  }

  // 4️⃣ Upload new images
  const imageFiles = formData.getAll("images") as File[];
  const uploadedImages = [...keptImages];

  for (const file of imageFiles) {
    if (!(file instanceof File) || file.size === 0) continue;

    const imageUrl = await uploadImage({
      file,
      table: "products",
      path: "product-images",
    });

    uploadedImages.push(imageUrl);
  }

  /* -------------------- UPDATE PRODUCT -------------------- */

  const { error: productError } = await supabase
    .from("products")
    .update({
      ...productData,
      images: uploadedImages,
      ...(mainImageUrl && { main_image: mainImageUrl }),
    })
    .eq("id", productId);

  if (productError) throw productError;

  /* ---------------- PRODUCT CATEGORIES ---------------- */

  if ((formData.get("category_ids") as string) === "Select option")
    throw new Error("Select at least one category");
  
  const newCategoryIds: number[] = JSON.parse(
    (formData.get("category_ids") as string) || "[]",
  );

  const existingCategoryIds: number[] = JSON.parse(
    (formData.get("old_category_ids") as string) || "[]",
  );

  // diff
  const toAdd = newCategoryIds.filter(
    (id) => !existingCategoryIds.includes(id),
  );

  const toDelete = existingCategoryIds.filter(
    (id) => !newCategoryIds.includes(id),
  );

  // insert
  if (toAdd.length) {
    await supabase.from("product_categories").insert(
      toAdd.map((category_id) => ({
        product_id: productId,
        category_id,
      })),
    );
  }

  // delete
  if (toDelete.length) {
    const { error } = await supabase
      .from("product_categories")
      .delete()
      .eq("product_id", productId)
      .in("category_id", toDelete);

    if (error) throw error;
  }

  return { success: true };
}

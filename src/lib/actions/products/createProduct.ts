"use server";

import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/utils/uploadImage";

function slugify(text: string): string {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  const nameEn = (formData.get("name_en") as string) || "";
  const slug = slugify(nameEn) + "-" + crypto.randomUUID().slice(0, 8);

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
    slug,
  };

  /* -------------------- MAIN IMAGE -------------------- */
  const mainImage = formData.get("main_image") as File | null;
  if (!mainImage || mainImage.size === 0) {
    throw new Error("Main image is required");
  }

  const mainImageUrl = await uploadImage({
    file: mainImage,
    table: "products",
    path: "product-images",
  });

  /* -------------------- IMAGES -------------------- */
  const imageFiles = formData.getAll("images") as File[];
  const uploadedImages: string[] = [];

  for (const file of imageFiles) {
    if (!(file instanceof File) || file.size === 0) continue;
    const imageUrl = await uploadImage({
      file,
      table: "products",
      path: "product-images",
    });
    uploadedImages.push(imageUrl);
  }

  /*-----CHECK IF CATEGORY SELECTED BEFORE INSERT-----*/
  const categoryIdsRaw = formData.get("category_ids") as string;
  if (categoryIdsRaw === "Select option" || !categoryIdsRaw) {
    throw new Error("Select at least one category");
  }
  
  const categoryIds: number[] = JSON.parse(categoryIdsRaw || "[]");
  if (categoryIds.length === 0) {
    throw new Error("Select at least one category");
  }
  
  /* -------------------- INSERT PRODUCT -------------------- */
  const { data: newProduct, error: productError } = await supabase
    .from("products")
    .insert({
      ...productData,
      main_image: mainImageUrl,
      images: uploadedImages,
    })
    .select("id")
    .single();

  if (productError) throw productError;
  const productId = newProduct.id;

  /* -------------------- PRODUCT CATEGORIES -------------------- */
  const { error: categoriesError } = await supabase
    .from("product_categories")
    .insert(
      categoryIds.map((category_id) => ({
        product_id: productId,
        category_id,
      })),
    );

  if (categoriesError) throw categoriesError;

  return { success: true, id: productId };
}

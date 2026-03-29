"use server";
import { createClient } from "../../supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { Product } from "@/types/Product";

export async function getProductById(id: string) {
  const supabase = await createClient();

  const {
    data: product,
    error,
  }: { data: Product | null; error: PostgrestError | null } = await supabase
    .from("products")
    .select(
      `
    *,
    product_categories:categories (*)
  `,
    )
    .is("deleted_at", null)
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return product;
}

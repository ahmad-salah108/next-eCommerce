"use server"
import { createClient } from "../../supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { CategoryType } from "@/types/CategoryType";

export async function getCategoryById(id: string) {
  const supabase = await createClient();

  const {
    data: category,
    error,
  }: { data: CategoryType | null; error: PostgrestError | null } = await supabase
    .from("categories")
    .select("*")
    .is("deleted_at", null)
    .eq("id", id)
    .single();

  if (error) {
    console.error(error)
    throw error
  }

  return category;
}

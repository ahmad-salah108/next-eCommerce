"use server"; // <--- because of this line, React Query will now automatically treat it
// as a network request to the server instead of trying to run the logic in the browser.
import { createClient } from "../../supabase/server";

export async function deleteProductById(id: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Product delete error:", error);
    throw error;
  }

  return { success: true };
}

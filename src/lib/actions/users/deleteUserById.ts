"use server"; // <--- because of this line, React Query will now automatically treat it
import { supabaseAdmin } from "@/lib/supabase/admin";
// as a network request to the server instead of trying to run the logic in the browser.

export async function deleteUserById(user_id: string) {
  // 1️⃣ Delete from Supabase Auth (this is the real user)
  const { error: authError } =
    await supabaseAdmin.auth.admin.deleteUser(user_id);

  if (authError) {
    console.error("Auth delete error:", authError);
    throw authError;
  }

  // 2️⃣ Soft Delete profile row
  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .update({ deleted_at: new Date().toISOString() })
    .eq("user_id", user_id);

  if (profileError) {
    console.error("Profile delete error:", profileError);
    throw profileError;
  }

  return { success: true };
}

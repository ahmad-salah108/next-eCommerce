"use server"
import { supabaseAdmin } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

type UpdateUserState = {
  error: string | null;
  success?: boolean;
};

export async function updateUser(
  prevState: UpdateUserState,
  formData: FormData
): Promise<UpdateUserState> {
  const user_id = formData.get("user_id") as string;
  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as "customer" | "admin";

  if (!user_id || !email || !full_name || !role) {
    return { error: "Missing required fields" };
  }

  /* 1️⃣ Update email in auth.users */
  const { error: authError } =
    await supabaseAdmin.auth.admin.updateUserById(user_id, {
      email,
    });

  if (authError) {
    console.error(authError)
    return { error: authError.message };
  }

  /* 2️⃣ Update profile data */
  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .update({
      full_name,
      role,
    })
    .eq("user_id", user_id);

  if (profileError) {
    console.error(profileError)
    return { error: profileError.message };
  }

  redirect("/dashboard/users?updated=true")
}
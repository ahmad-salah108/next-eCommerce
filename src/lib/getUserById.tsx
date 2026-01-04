import { UserType } from "@/types/UserType";
import { createClient } from "./supabase/server";
import { supabaseAdmin } from "./supabase/admin";

export async function getUserById(id: string) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  const {
    data: { user },
  } = await supabaseAdmin.auth.admin.getUserById(profile?.user_id);

  const data: UserType = {
    ...profile,
    email: user?.email,
  };

  return data ?? null;
}

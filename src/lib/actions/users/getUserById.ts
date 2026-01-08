"use server"
import { UserType } from "@/types/UserType";
import { createClient } from "../../supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export async function getUserById(id: string) {
  const supabase = await createClient();

  const {
    data: profile,
    error,
  }: { data: UserType | null; error: PostgrestError | null } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error)
  }

  return {profile, error};
}

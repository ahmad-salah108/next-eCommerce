"use server"
import { User } from "@/types/User";
import { createClient } from "../../supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export async function getUserById(id: string) {
  const supabase = await createClient();

  const {
    data: profile,
    error,
  }: { data: User | null; error: PostgrestError | null } = await supabase
    .from("profiles")
    .select("*")
    .is("deleted_at", null)
    .eq("id", id)
    .single();

  if (error) {
    console.error(error)
    throw error
  }

  return profile;
}

import { UserType } from "@/types/UserType";
import { createClient } from "./supabase/server";

export async function getUserById(id: string) {
  const supabase = await createClient();

  const { data: profile }: {data: UserType | null} = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  return profile ?? null;
}

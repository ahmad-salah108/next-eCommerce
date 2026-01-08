"use server"

import { UserType } from "@/types/UserType";
import { createClient } from "../../supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile }: {data: UserType | null} = await supabase
    .from('profiles')
    .select("*")
    .eq('user_id', user.id)
    .single();

  return profile ?? null;
}
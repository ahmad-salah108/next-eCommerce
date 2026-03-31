"use server"

import { User } from "@/types/User";
import { createClient } from "../../supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();
  
  const { data: profile }: {data: User | null} = await supabase
    .from('profiles')
    .select("*")
    .eq('user_id', user?.id)
    .single();

  return profile ?? null;
}
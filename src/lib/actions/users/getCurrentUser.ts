"use server"

import { UserType } from "@/types/UserType";
import { createClient } from "../../supabase/server";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user){
    redirect("/sign-in")
  };
  
  const { data: profile }: {data: UserType | null} = await supabase
    .from('profiles')
    .select("*")
    .eq('user_id', user.id)
    .single();

  return profile ?? null;
}
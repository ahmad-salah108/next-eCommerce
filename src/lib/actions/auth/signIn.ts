"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { mapSignInError } from "@/lib/supabase/auth-errors";
import { SignInFormState } from "@/types/SignInFormState";

export async function signIn(
  _prevState: SignInFormState,
  formData: FormData
): Promise<SignInFormState> {
  const supabase = await createClient();

  const email = formData.get("email")?.toString() as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "All fields are required.", email };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: mapSignInError(error.message), email };
  }

  // Fetch the user's role from 'profiles' table
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", data.user.id)
    .single();

  // Determine redirect based on role
  if (profile?.role === "admin") {
    return redirect("/dashboard/users");
  } else {
    return redirect("/");
  }
}
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { mapSignUpError, mapSignInError } from "@/lib/supabase/auth-errors";
import { FormState } from "@/types/FormStateType";

export async function signIn(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "All fields are required." };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: mapSignInError(error.message) };
  }

  // Fetch the user's role from 'profiles' table
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  // Determine redirect based on role
  if (profile?.role === "admin") {
    return redirect("/dashboard");
  } else {
    return redirect("/");
  }
}

export async function signUp(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();

  const fullName = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  // const t = await getTranslations();

  if (!fullName || !email || !password) {
    return { error: "All fields are required." };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  // Check if email already exists
  if (data?.user && data.user.identities?.length === 0) {
    return { error: "This email is already in use. Please sign in instead." };
  }

  if (error) {
    return { error: mapSignUpError(error.message) };
  }

  redirect("/sign-in?isRegistered=true");
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/sign-in");
}

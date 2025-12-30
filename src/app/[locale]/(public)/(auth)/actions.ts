"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { mapSignUpError, mapSignInError } from "@/lib/supabase/auth-errors";
import { SignUpFormStateType } from "@/types/SignUpFormStateType";
import { signUpSchema } from "@/lib/validations/auth";
import { SignInFormStateType } from "@/types/SignInFormStateType";

export async function signIn(
  _prevState: SignInFormStateType,
  formData: FormData
): Promise<SignInFormStateType> {
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
  _prevState: SignUpFormStateType,
  formData: FormData
): Promise<SignUpFormStateType> {
    const values = {
    full_name: formData.get("full_name")?.toString(),
    email: formData.get("email")?.toString(),
  };

  const parsed = signUpSchema.safeParse({
    ...values,
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;

    return {
      errors: {
        email: errors.email?.[0],
        password: errors.password?.[0],
        confirm_password: errors.confirm_password?.[0],
      },
      values
    };
  }

  const { email, password, full_name } = parsed.data;
  const supabase = await createClient();

  if (!full_name || !email || !password) {
    return { errors: {general: "All fields are required."}, values };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: full_name,
      },
    },
  });

  // Check if email already exists
  if (data?.user && data.user.identities?.length === 0) {
    return { errors: {general: "This email is already in use. Please sign in instead."}, values };
  }

  if (error) {
    return { errors: mapSignUpError(error.message), values };
  }

  redirect("/sign-in?isRegistered=true");
}


export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/sign-in");
}

"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { mapSignUpError } from "@/lib/supabase/auth-errors";
import { SignUpFormState } from "@/types/SignUpFormState";
import { signUpSchema } from "@/lib/validations/auth";

export async function signUp(
  _prevState: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
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
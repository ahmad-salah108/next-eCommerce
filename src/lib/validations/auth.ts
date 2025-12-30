import { z } from "zod";

/* ---------- Sign In ---------- */
export const signInSchema = z.object({
  email: z.email("Invalid email address"),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

/* ---------- Sign Up ---------- */
export const signUpSchema = z
  .object({
    full_name: z.string().min(2, "Full name must be at least 2 characters"),

    email: z.email("Invalid email address"),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-zA-Z]/, {
        message: "Password must contain at least one letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),

    confirm_password: z.string("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

/* ---------- Types ---------- */
export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;

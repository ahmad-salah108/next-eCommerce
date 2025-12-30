"use client";
import { signUp } from "../actions";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

const initialState = { error: null };

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  return (
    <form className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <Button variant={"outline"} asChild>
          <Link href={"/"}>
            <ArrowLeftIcon /> Back to Home Page
          </Link>
        </Button>
      </div>

      <label htmlFor="full_name">Full Name</label>
      <input name="full_name" type="text" required className="border p-2" />

      <label htmlFor="email">Email</label>
      <input name="email" type="email" required className="border p-2" />

      <label htmlFor="password">Password</label>
      <input name="password" type="password" required className="border p-2" />

      <label htmlFor="confirm_password">Confirm Password</label>
      <input
        name="confirm_password"
        type="password"
        required
        className="border p-2"
      />

      {state.error && <p className="text-red-500 text-sm">{state.error}</p>}

      <p className="text-sm">
        Already have an account?{" "}
        <Link href={"/sign-in"} className="underline">
          Sign In
        </Link>
      </p>

      <Button
        formAction={formAction}
        className="p-2 py-5 mt-2 rounded text-base font-normal flex justify-center items-center"
        disabled={isPending}
      >
        {isPending && <Spinner />}
        Sign Up
      </Button>
    </form>
  );
}

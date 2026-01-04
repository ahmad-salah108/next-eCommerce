"use client";
import { signIn } from "../actions";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

const initialState = {
  error: null,
  email: null,
};

export default function SignInPage() {
  const [state, formAction, isPending] = useActionState(signIn, initialState);
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    if (searchParams.get("isRegistered") === "true") {
      toast.success(t("auth.register_success"));
      router.replace("/sign-in");
    }
  }, [searchParams, router]);

  return (
    <form className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">Sign In</h2>
        <Button variant={"outline"} asChild>
          <Link href={"/"}>
            <ArrowLeftIcon /> Back to Home Page
          </Link>
        </Button>
      </div>

      <label htmlFor="email">Email</label>
      <input
        name="email"
        type="email"
        required
        defaultValue={state?.email ?? ""}
        className="border p-2"
      />

      <label htmlFor="password">Password</label>
      <input name="password" type="password" required className="border p-2" />

      {state.error && <p className="text-red-500 text-sm">{state.error}</p>}

      <p className="text-sm">
        Don&apos;t have an account?{" "}
        <Link href={"/sign-up"} className="underline">
          Sign Up
        </Link>
      </p>

      <Button
        formAction={formAction}
        disabled={isPending}
        className="p-2 py-5 mt-2 rounded text-base font-normal flex justify-center items-center"
      >
        {isPending && <Spinner />}
        Sign In
      </Button>
    </form>
  );
}

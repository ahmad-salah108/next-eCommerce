import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { setRequestLocale } from "next-intl/server";
import "@/styles/globals.css";

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const { locale } = await params;

  // Redirect to dashboard if user is already authenticated
  if (data.user) {
    redirect("/admin-dashboard");
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded- mx-5">
        {children}
      </div>
    </div>
  );
}

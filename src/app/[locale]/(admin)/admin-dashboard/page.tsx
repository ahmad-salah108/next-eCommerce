import { createClient } from "@/lib/supabase/server";
import { setRequestLocale } from "next-intl/server";

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const { locale } = await params;

  // Enable static rendering for this locale
  setRequestLocale(locale);

  return (
    <main>
      <h1>Welcome, {user?.email}</h1>
      <h2>Admin Dashboard</h2>
      <p>This is a protected server route.</p>
    </main>
  );
}

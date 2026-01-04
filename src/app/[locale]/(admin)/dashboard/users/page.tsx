import UsersTable from "@/app/[locale]/(admin)/dashboard/users/components/UsersTable";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import SearchInput from "./components/SearchInput";
import ToastHandler from "./components/ToastHandler";

export const metadata: Metadata = {
  title: "Users",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default async function UsersPage() {
  const supabase = await createClient();

  /** 1. Fetch profiles */
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, user_id, full_name, role, is_verified, created_at");

  if (profilesError) {
    console.error(profilesError);
    return <p className="text-red-500">Failed to load profiles</p>;
  }

  /** 2. Fetch auth users (emails) */
  const { data: authUsers, error: authError } =
    await supabaseAdmin.auth.admin.listUsers();

  if (authError) {
    console.error(authError);
    return <p className="text-red-500">Failed to load users</p>;
  }

  /** 3. Merge by user id */
  const users = profiles.map((profile) => {
    const authUser = authUsers.users.find((user) => user.id === profile.user_id);

    return {
      id: profile.id,
      user_id: authUser?.id,
      full_name: profile.full_name ?? "—",
      email: authUser?.email ?? "—",
      role: profile.role,
      is_verified: profile.is_verified,
      created_at: profile.created_at,
    };
  });

  return (
    <div>
      <ToastHandler />
      <div className="flex flex-wrap items-center justify-between gap-8 mb-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Users
        </h2>
        <SearchInput/>
      </div>
      <div className="space-y-6">
        <UsersTable users={users} />
      </div>
    </div>
  );
}

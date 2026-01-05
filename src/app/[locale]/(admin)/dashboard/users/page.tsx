import UsersTable from "@/app/[locale]/(admin)/dashboard/users/components/UsersTable";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import SearchInput from "./components/SearchInput";
import ToastHandler from "./components/ToastHandler";
import Pagination from "../../components/tables/Pagination";
import { UserType } from "@/types/UserType";
import { PostgrestError } from "@supabase/supabase-js";
import _ from "lodash"

export const metadata: Metadata = {
  title: "Users",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

const PAGE_SIZE = 10;

type Props = {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
};

export default async function UsersPage({ searchParams }: Props) {
  const supabase = await createClient();
  const { page: paramsPage, q = "" } = await searchParams;

  const page = Math.max(Number(paramsPage) || 1, 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  /** 1. Fetch profiles chained with search value */
  let query = supabase
    .from("profiles")
    .select("*", {
      count: "exact",
    })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (q) {
    query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%`);
  }

  /** 2. Await for profiles */
  const {
    data: users,
    error: profilesError,
    count,
  }: {
    data: Array<UserType> | null;
    error: PostgrestError | null;
    count: number | null;
  } = await query;

  if (profilesError) {
    console.error(profilesError);
    return <p className="text-red-500">Failed to load profiles</p>;
  }

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <div>
      <ToastHandler />
      <div className="flex flex-wrap items-center justify-between gap-8 mb-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Users
        </h2>
        <SearchInput />
      </div>
      {_.isEmpty(users) && <p className="text-center text-gray-500 dark:text-gray-400 mt-16">There are no users {q && `matches "${q}"`}</p>}
      {!_.isEmpty(users) && <div className="space-y-6">
        <UsersTable users={users ?? []} />
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {PAGE_SIZE} users per page
          </p>
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      </div>}
    </div>
  );
}

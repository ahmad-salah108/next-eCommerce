import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import Pagination from "../../components/tables/Pagination";
import { PostgrestError } from "@supabase/supabase-js";
import _ from "lodash"
import { CategoryType } from "@/types/CategoryType";
import SearchInput from "../../components/SearchInput";
import CategoriesTable from "./components/CategoriesTable";
import UpdateToastHandler from "../../components/UpdateToastHandler";

export const metadata: Metadata = {
  title: "Categories",
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

export default async function CategoriesPage({ searchParams }: Props) {
  const supabase = await createClient();
  const { page: paramsPage, q = "" } = await searchParams;

  const page = Math.max(Number(paramsPage) || 1, 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  /** 1. Fetch categories chained with search value */
  let query = supabase
    .from("categories")
    .select("*", {
      count: "exact",
    })
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (q) {
    query = query.or(`name.ilike.%${q}%`);
  }

  /** 2. Await for categories */
  const {
    data: categories,
    error,
    count,
  }: {
    data: Array<CategoryType> | null;
    error: PostgrestError | null;
    count: number | null;
  } = await query;

  if (error) {
    console.error(error);
    return <p className="text-red-500">Failed to load categories</p>;
  }

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <div>
      <UpdateToastHandler message="Category updated successfully!" urlToReplace="/dashboard/categories"/>
      <div className="flex flex-wrap items-center justify-between gap-8 mb-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Categories
        </h2>
        <SearchInput placeholder="Search categories..."/>
      </div>
      {_.isEmpty(categories) && !q && <p className="text-center text-gray-500 dark:text-gray-400 mt-16">There are no categories</p>}
      {_.isEmpty(categories) && q && <p className="text-center text-gray-500 dark:text-gray-400 mt-16">There is no category {q && `matches "${q}"`}</p>}
      {!_.isEmpty(categories) && <div className="space-y-6">
        <CategoriesTable categories={categories ?? []} />
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {PAGE_SIZE} categories per page
          </p>
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      </div>}
    </div>
  );
}

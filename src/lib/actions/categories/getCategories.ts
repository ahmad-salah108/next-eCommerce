"use server";

import { createClient } from "@/lib/supabase/server";
import { CategoryType } from "@/types/CategoryType";
import { PostgrestError } from "@supabase/supabase-js";

type Props = {
  page?: string;
  q?: string;
  PAGE_SIZE: number
};

async function getCategories({ page: paramsPage, q, PAGE_SIZE }: Props) {
  const supabase = await createClient();

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

  if (error) throw error;

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return { categories, page, totalPages };
}

export default getCategories;

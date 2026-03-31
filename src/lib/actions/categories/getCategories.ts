"use server";

import { createClient } from "@/lib/supabase/server";
import { Category } from "@/types/Category";
import { PostgrestError } from "@supabase/supabase-js";
import { PAGE_SIZE as pageSize } from "@/constants/page-size";

type Props = {
  page?: string;
  q?: string;
  PAGE_SIZE?: number;
  getAll?: boolean
};

async function getCategories({ page: paramsPage, q, PAGE_SIZE = pageSize, getAll = false }: Props) {
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
    .order("created_at", { ascending: false });

  /** 2. Conditionally apply range */
  if (!getAll) {
    query = query.range(from, to);
  }

  if (q) {
    query = query.or(`name.ilike.%${q}%`);
  }

  /** 3. Await for categories */
  const {
    data: categories,
    error,
    count,
  }: {
    data: Array<Category> | null;
    error: PostgrestError | null;
    count: number | null;
  } = await query;

  if (error) throw error;

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return { categories, page, totalPages };
}

export default getCategories;

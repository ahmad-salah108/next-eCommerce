"use server";

import { createClient } from "@/lib/supabase/server";
import { ProductType } from "@/types/ProductType";
import { PostgrestError } from "@supabase/supabase-js";

type Props = {
  page?: string;
  q?: string;
  PAGE_SIZE: number;
};

async function getProducts({ page: paramsPage, q, PAGE_SIZE }: Props) {
  const supabase = await createClient();

  const page = Math.max(Number(paramsPage) || 1, 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  /** 1. Fetch products chained with search value */
  let query = supabase
    .from("products")
    .select(
      `
    *,
    product_categories:categories (*)
  `,
      {
        count: "exact",
      },
    )
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (q) {
    query = query.or(`name->>en.ilike.%${q}%, name->>ar.ilike.%${q}%`);
  }

  /** 2. Await for products */
  const {
    data: products,
    error,
    count,
  }: {
    data: Array<ProductType> | null;
    error: PostgrestError | null;
    count: number | null;
  } = await query;

  if (error) throw error;

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return { products, page, totalPages };
}

export default getProducts;

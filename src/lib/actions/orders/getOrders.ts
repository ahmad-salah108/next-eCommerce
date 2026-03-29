"use server"

import { createClient } from "@/lib/supabase/server";
import { OrderWithUser } from "@/types/Order";
import { PostgrestError } from "@supabase/supabase-js";

type Props = {
  page?: string;
  q?: string;
  PAGE_SIZE?: number;
  getAll?: boolean
};

export const getOrders = async ({ page: paramsPage, q, PAGE_SIZE = 10, getAll = false }: Props) => {
  const supabase = await createClient();

  const page = Math.max(Number(paramsPage) || 1, 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  /** 1. Fetch orders chained with search value */
  let query = supabase
    .from("orders")
    .select("*, user:profiles(full_name)", {
      count: "exact",
    })
    .order("created_at", { ascending: false });

  /** 2. Conditionally apply range */
  if (!getAll) {
    query = query.range(from, to);
  }

  if (q) {
    query = query.or(`full_name.ilike.%${q}%`);
  }

  /** 3. Await for orders */
  const {
    data: orders,
    error,
    count,
  }: {
    data: Array<OrderWithUser> | null;
    error: PostgrestError | null;
    count: number | null;
  } = await query;

  if (error) throw error;

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return { orders, page, totalPages };
}
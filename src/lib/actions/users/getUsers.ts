"use server";

import { createClient } from "@/lib/supabase/server";
import { UserType } from "@/types/UserType";
import { PostgrestError } from "@supabase/supabase-js";

type Props = {
  page?: string;
  q?: string;
  PAGE_SIZE: number
};

async function getUsers({ page: paramsPage, q, PAGE_SIZE }: Props) {
  const supabase = await createClient();

  const page = Math.max(Number(paramsPage) || 1, 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  /** 1. Fetch profiles chained with search value */
  let query = supabase
    .from("profiles")
    .select("*", {
      count: "exact",
    })
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (q) {
    query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%`);
  }

  /** 2. Await for profiles */
  const {
    data: users,
    error,
    count,
  }: {
    data: Array<UserType> | null;
    error: PostgrestError | null;
    count: number | null;
  } = await query;

  if (error) throw error;

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return { users, page, totalPages };
}

export default getUsers;

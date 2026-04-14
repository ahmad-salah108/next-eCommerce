"use client";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getCategoryById } from "@/lib/actions/categories/getCategoryById";
import { useQuery } from "@tanstack/react-query";

function useCategoryDetailsQuery({ id }: { id: string }) {
  return useQuery({
    queryKey: QUERY_KEYS.categories.details(id),
    queryFn: () => getCategoryById(id),
  });
}

export default useCategoryDetailsQuery;

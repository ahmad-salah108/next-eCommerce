"use client";
import { QUERY_KEYS } from "@/constants/query-keys";
import getCategories from "@/lib/actions/categories/getCategories";
import { QueryProps } from "@/types/QueryProps";
import { useQuery } from "@tanstack/react-query";

function useCategoriesQuery({ params, PAGE_SIZE, getAll = false }: QueryProps) {
  return useQuery({
    queryKey: getAll
      ? QUERY_KEYS.categories.all
      : QUERY_KEYS.categories.list(params?.page, params?.q),
    queryFn: () => getCategories({ ...params, PAGE_SIZE, getAll }),
  });
}

export default useCategoriesQuery;

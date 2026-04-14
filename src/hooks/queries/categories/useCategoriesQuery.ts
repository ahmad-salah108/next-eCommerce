"use client";
import { QUERY_KEYS } from "@/constants/query-keys";
import getCategories from "@/lib/actions/categories/getCategories";
import { TablePageParams } from "@/types/TablePageParams";
import { useQuery } from "@tanstack/react-query";

type Props =
  | {
      getAll: true; // If getAll is true...
      params?: TablePageParams; // The rest become optional
      PAGE_SIZE?: number;
    }
  | {
      getAll?: false; // If getAll is false (or undefined)...
      params: TablePageParams; // The rest are mandatory
      PAGE_SIZE: number;
    };

function useCategoriesQuery({ params, PAGE_SIZE, getAll = false }: Props) {
  return useQuery({
    queryKey: getAll
      ? QUERY_KEYS.categories.all
      : QUERY_KEYS.categories.list(params?.page, params?.q),
    queryFn: () => getCategories({ ...params, PAGE_SIZE, getAll }),
  });
}

export default useCategoriesQuery;

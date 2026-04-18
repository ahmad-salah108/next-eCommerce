"use client";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import getProducts from "@/lib/actions/products/getProducts";
import { QueryProps } from "@/types/QueryProps";

function useProductsQuery({ params, PAGE_SIZE, getAll = false }: QueryProps) {
  return useQuery({
    queryKey: getAll ? QUERY_KEYS.products.all : QUERY_KEYS.products.list(
      params?.page,
      params?.q,
    ),
    queryFn: () => getProducts({ ...params, PAGE_SIZE, getAll }),
  });
}

export default useProductsQuery;

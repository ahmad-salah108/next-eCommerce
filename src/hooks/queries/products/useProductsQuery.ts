"use client";
import { QUERY_KEYS } from "@/constants/query-keys";
import { TablePageParams } from "@/types/TablePageParams";
import { useQuery } from "@tanstack/react-query";
import getProducts from "@/lib/actions/products/getProducts";

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

function useProductsQuery({ params, PAGE_SIZE, getAll = false }: Props) {
  return useQuery({
    queryKey: getAll ? QUERY_KEYS.products.all : QUERY_KEYS.products.list(
      params?.page,
      params?.q,
    ),
    queryFn: () => getProducts({ ...params, PAGE_SIZE, getAll }),
  });
}

export default useProductsQuery;

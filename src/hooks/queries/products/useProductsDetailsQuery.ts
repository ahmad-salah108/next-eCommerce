"use client";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getProductById } from "@/lib/actions/products/getProductById";
import { useQuery } from "@tanstack/react-query";

function useProductsDetailsQuery({ id }: { id: string }) {
  return useQuery({
    queryKey: QUERY_KEYS.products.details(id),
    queryFn: () => getProductById(id),
  });
}

export default useProductsDetailsQuery;

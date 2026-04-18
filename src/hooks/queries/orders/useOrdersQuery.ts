"use client";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/actions/orders/getOrders";
import { QueryProps } from "@/types/QueryProps";

function useOrdersQuery({ params, PAGE_SIZE, getAll = false }: QueryProps) {
  return useQuery({
    queryKey: getAll ? QUERY_KEYS.orders.all : QUERY_KEYS.orders.list(
      params?.page,
      params?.q,
    ),
    queryFn: () => getOrders({ ...params, PAGE_SIZE, getAll }),
  });
}

export default useOrdersQuery;

"use client";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getOrderById } from "@/lib/actions/orders/getOrderById";
import { useQuery } from "@tanstack/react-query";

function useOrderDetailsQuery({ id }: { id: string }) {
  return useQuery({
    queryKey: QUERY_KEYS.orders.details(id),
    queryFn: () => getOrderById(id),
  });
}

export default useOrderDetailsQuery;

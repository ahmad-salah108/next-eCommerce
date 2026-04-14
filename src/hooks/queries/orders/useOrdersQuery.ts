"use client";
import { QUERY_KEYS } from "@/constants/query-keys";
import { TablePageParams } from "@/types/TablePageParams";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/actions/orders/getOrders";

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

function useOrdersQuery({ params, PAGE_SIZE, getAll = false }: Props) {
  return useQuery({
    queryKey: getAll ? QUERY_KEYS.orders.all : QUERY_KEYS.orders.list(
      params?.page,
      params?.q,
    ),
    queryFn: () => getOrders({ ...params, PAGE_SIZE, getAll }),
  });
}

export default useOrdersQuery;

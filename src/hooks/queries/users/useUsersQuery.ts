"use client";
import { QUERY_KEYS } from "@/constants/query-keys";
import { TablePageParams } from "@/types/TablePageParams";
import { useQuery } from "@tanstack/react-query";
import getUsers from "@/lib/actions/users/getUsers";

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

function useUsersQuery({ params, PAGE_SIZE, getAll = false }: Props) {
  return useQuery({
    queryKey: getAll ? QUERY_KEYS.users.all : QUERY_KEYS.users.list(
      params?.page,
      params?.q,
    ),
    queryFn: () => getUsers({ ...params, PAGE_SIZE, getAll }),
  });
}

export default useUsersQuery;

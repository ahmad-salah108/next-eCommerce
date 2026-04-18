"use client";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import getUsers from "@/lib/actions/users/getUsers";
import { QueryProps } from "@/types/QueryProps";

function useUsersQuery({ params, PAGE_SIZE, getAll = false }: QueryProps) {
  return useQuery({
    queryKey: getAll ? QUERY_KEYS.users.all : QUERY_KEYS.users.list(
      params?.page,
      params?.q,
    ),
    queryFn: () => getUsers({ ...params, PAGE_SIZE, getAll }),
  });
}

export default useUsersQuery;

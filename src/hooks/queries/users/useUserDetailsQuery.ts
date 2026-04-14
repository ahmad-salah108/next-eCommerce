"use client";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getUserById } from "@/lib/actions/users/getUserById";
import { useQuery } from "@tanstack/react-query";

function useUserDetailsQuery({ id }: { id: string }) {
  return useQuery({
    queryKey: QUERY_KEYS.users.details(id),
    queryFn: () => getUserById(id),
  });
}

export default useUserDetailsQuery;

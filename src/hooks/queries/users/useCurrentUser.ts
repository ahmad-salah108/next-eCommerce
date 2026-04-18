"use client";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/actions/users/getCurrentUser";

// useCurrentUser for client components, and getCurrentUser is for server components
function useCurrentUser() {
  return useQuery({
    queryKey: QUERY_KEYS.users.current,
    queryFn: () => getCurrentUser(),
  });
}

export default useCurrentUser;

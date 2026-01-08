"use client";
import { UserProvider } from "@/context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function PublicProviders({ children }: { children: React.ReactNode }) {
  // Using useState to ensure the QueryClient is only created once per session
  // and not recreated on every re-render.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,          // data considered fresh for 30s
            gcTime: 5 * 60 * 1000,      // cache cleanup after 5mins of inactive data (data becomes inactive when component unmounts)
            refetchOnWindowFocus: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  );
}

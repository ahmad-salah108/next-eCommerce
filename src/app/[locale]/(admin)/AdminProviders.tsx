"use client";
import { SidebarProvider } from "@/context/admin/SidebarContext";
import { ThemeProvider } from "@/context/admin/ThemeContext";
import { UserProvider } from "@/context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function AdminProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  // Using useState to ensure the QueryClient is only created once per session
  // and not recreated on every re-render.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // distinct caching for 1 minute
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

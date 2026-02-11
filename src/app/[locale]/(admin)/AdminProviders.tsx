"use client";
import { SidebarProvider } from "@/context/admin/SidebarContext";
import { ThemeProvider } from "@/context/admin/ThemeContext";
import { UserProvider } from "@/context/UserContext";
import { routing } from "@/i18n/routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextIntlClientProvider } from "next-intl";
import { useState } from "react";

export default function AdminProviders({
  children,
  locale
}: {
  children: React.ReactNode;
  locale: (typeof routing.locales)[number]
}) {
  // Using useState to ensure the QueryClient is only created once per session
  // and not recreated on every re-render.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // data considered fresh for 30s
            gcTime: 5 * 60 * 1000, // cache cleanup after 5mins of inactive data (data becomes inactive when component unmounts)
            refetchInterval: 60 * 1000, // ⬅️ auto-check DB every 60s
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider locale={locale}>
        <UserProvider>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </UserProvider>
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
}

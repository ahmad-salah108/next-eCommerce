import { setRequestLocale } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import "@/styles/admin-globals.css";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { getFontClassName } from "@/lib/utils/getFontClassName";
import { getLangDir } from "rtl-detect";
import { getCurrentUser } from "@/lib/actions/users/getCurrentUser";
import { use } from "react";
import NextTopLoader from "nextjs-toploader";
import AdminProviders from "./AdminProviders";
import AppSidebar from "./layout/AppSidebar";
import Backdrop from "./layout/Backdrop";
import MainContent from "./MainContent";
import { Toaster } from "sonner";
import { Metadata } from "next";
import _ from "lodash";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    template: "%s | SHOPYA", // %s will be replaced by the child page title
    default: "Admin Dashboard | SHOPYA", // Fallback if a page has no title
  },
  description: "E-commerce Management System",
};

function AdminDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const currentUser = use(getCurrentUser());

  if(currentUser?.role !== "admin"){
    redirect("/")
  }

  const { locale } = use(params);

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);

  const fontClassName = getFontClassName(locale);
  const direction = getLangDir(locale);

  return (
    <html lang={locale} dir={direction}>
      <body className={`${fontClassName} antialiased dark:bg-gray-900`}>
        <NextTopLoader/>
        <Toaster richColors expand/>
        <AdminProviders locale={locale}>
          <div className="min-h-screen xl:flex">
            {/* Sidebar and Backdrop */}
            <AppSidebar />
            <Backdrop />
            {/* Main Content Area */}
            <MainContent currentUser={currentUser}> {/* User doesn't have much data so i pass it all, as I will need it */}
              {children}
            </MainContent>
          </div>
        </AdminProviders>
      </body>
    </html>
  );
}

export default AdminDashboardLayout;

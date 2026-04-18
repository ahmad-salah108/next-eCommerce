import React from "react";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import "@/styles/embla.css";
import { getCurrentUser } from "@/lib/actions/users/getCurrentUser";

async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentUser = await getCurrentUser();

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);

  return (
    <div>
      <header className="sticky top-0 z-60">
        <Banner />
        <Navbar locale={locale} currentUser={currentUser}/>
      </header>
      {children}
      <Footer />
    </div>
  );
}

export default PublicLayout;

import React from "react";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { setRequestLocale } from "next-intl/server";
import "@/styles/globals.css";
import "@/styles/embla.css";

async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering for this locale
  setRequestLocale(locale);

  return (
    <div>
      <header className="sticky top-0 z-60">
        <Banner />
        <Navbar locale={locale} />
      </header>
      {children}
      <Footer />
    </div>
  );
}

export default PublicLayout;

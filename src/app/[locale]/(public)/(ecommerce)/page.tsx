import { setRequestLocale } from "next-intl/server";
import DressStyles from "./home-sections/dress-styles/DressStyles";
import Hero from "./home-sections/hero/Hero";
import NewArrivals from "./home-sections/new-arrivals/NewArrivals";
import OurCustomers from "./home-sections/our-customers/OurCustomers";
import TopSelling from "./home-sections/top-selling/TopSelling";
import { Button } from "@/components/ui/button";
import { logout } from "../(auth)/actions";
import { getCurrentUser } from "@/lib/actions/users/getCurrentUser";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);
  const currentUser = await getCurrentUser();
  return (
    <main>
      {currentUser?.full_name && (
        <div className="flex gap-4">
          <strong>{currentUser?.full_name}</strong>
          <form>
            <Button formAction={logout}>Sign Out</Button>
          </form>
        </div>
      )}
      <Hero locale={locale} />
      <NewArrivals />
      <div className="container mx-auto">
        <hr />
      </div>
      <TopSelling />
      <DressStyles />
      <OurCustomers />
    </main>
  );
}

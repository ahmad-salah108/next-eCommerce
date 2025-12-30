import { setRequestLocale } from "next-intl/server";
import DressStyles from "./home-sections/dress-styles/DressStyles";
import Hero from "./home-sections/hero/Hero";
import NewArrivals from "./home-sections/new-arrivals/NewArrivals";
import OurCustomers from "./home-sections/our-customers/OurCustomers";
import TopSelling from "./home-sections/top-selling/TopSelling";
import { getCurrentUserName } from "@/lib/getCurrnetUserName";
import { Button } from "@/components/ui/button";
import { logout } from "../(auth)/actions";

export default async function Home({params}:{params: Promise<{locale: string}>}) {
  const {locale} = await params;

  // Enable static rendering for this locale
  setRequestLocale(locale);
const name = await getCurrentUserName();
  return (
    <main>
      {name && <div className="flex gap-4"><strong>{name}</strong><form><Button formAction={logout}>Sign Out</Button></form></div>}
      <Hero locale={locale}/>
      <NewArrivals/>
      <div className="container mx-auto"><hr/></div>
      <TopSelling/>
      <DressStyles/>
      <OurCustomers/>
    </main>
  );
}

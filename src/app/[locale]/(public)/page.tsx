import DressStyles from "./home-sections/dress-styles/DressStyles";
import Footer from "./home-sections/footer/Footer";
import Hero from "./home-sections/hero/Hero";
import NewArrivals from "./home-sections/new-arrivals/NewArrivals";
import OurCustomers from "./home-sections/our-customers/OurCustomers";
import TopSelling from "./home-sections/top-selling/TopSelling";

export default async function Home({params}:{params: Promise<{locale: string}>}) {
  const {locale} = await params;

  return (
    <main>
      <Hero locale={locale}/>
      <NewArrivals/>
      <div className="container mx-auto"><hr/></div>
      <TopSelling/>
      <DressStyles/>
      <OurCustomers/>
      <Footer/>
    </main>
  );
}

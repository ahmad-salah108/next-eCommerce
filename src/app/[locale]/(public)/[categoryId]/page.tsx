import Breadcrumbs from "@/components/Breadcrumbs";
import CardProduct from "@/components/CardProduct";
import SortBy from "./components/SortBy";
import PaginationCategories from "./components/PaginationCategories";
import Filters from "./components/Filters";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import FiltersDrawer from "./components/FiltersDrawer";

const LINKS = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Category Name",
  },
];

const CARDS = Array.from({ length: 9 }).map((_, i) => (
  <CardProduct key={i} className={`mx-auto md:mx-0`} />
));

function CategoryPage() {
  return (
    <main className="container mx-auto py-12 space-y-8">
      <Breadcrumbs links={LINKS} />
      <div className="flex gap-4 w-full">
        <div className="hidden lg:block lg:basis-1/4">
          <Filters />
        </div>
        <div className="w-full lg:basis-3/4">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h1 className="font-bold text-3xl">Category Name</h1>
            <div className="lg:hidden">
              <FiltersDrawer/>
            </div>
            <div className="hidden lg:block">
              <SortBy />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {CARDS.map((c, i) => (
              <div key={i} className="col-span-6 md:col-span-3 2xl:col-span-2">
                {c}
              </div>
            ))}
            <div className="col-span-6 space-y-8 mt-4">
              <hr />
              <PaginationCategories />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CategoryPage;

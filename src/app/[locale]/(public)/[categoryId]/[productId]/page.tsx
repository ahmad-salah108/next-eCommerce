import Breadcrumbs from "@/components/Breadcrumbs";
import EmblaThumbsCarousel from "@/components/embla-carousel/EmblaThumbsCarousel";
import { EmblaOptionsType } from "embla-carousel";
import Thumbnail from "./components/Thumbnail";
import ProductImage from "./components/ProductImage";
import ProductOptions from "./components/ProductOptions";
import ProductReviews from "./components/ProductReviews";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import MightLike from "./components/MightLike";

const LINKS = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Category Name",
    url: "/1",
  },
  {
    title: "Product Name",
  },
];

function ProductPage() {
  const OPTIONS: EmblaOptionsType = {};
  const THUMBNAILS = [
    <Thumbnail key={1} n={1} />,
    <Thumbnail key={2} n={2} />,
    <Thumbnail key={3} n={1} />,
    <Thumbnail key={4} n={2} />,
    <Thumbnail key={5} n={1} />,
  ];
  const SLIDES = [
    <ProductImage key={1} n={1} />,
    <ProductImage key={2} n={2} />,
    <ProductImage key={3} n={1} />,
    <ProductImage key={4} n={2} />,
    <ProductImage key={5} n={1} />,
  ];
  return (
    <main className="container mx-auto py-12">
      <Breadcrumbs links={LINKS} />
      <div className="flex flex-col lg:flex-row gap-8 mt-16">
        <div className="lg:w-1/2">
          <EmblaThumbsCarousel
            slides={SLIDES}
            thumbnails={THUMBNAILS}
            options={OPTIONS}
          />
        </div>
        <div className="lg:w-1/2">

          {/* Product name */}
          <h1 className="text-4xl font-black uppercase mt-5 lg:mt-0">
            One Life Graphic T-shirt
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <Rating value={4} readOnly aria-label="Rating: 4 out of 5 stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton className="text-yellow-500" key={index} />
              ))}
            </Rating>
            <p className="translate-y-px" aria-hidden>
              4/<span className="text-muted-foreground">5</span>
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mt-4">
            <strong aria-label="new price" className="text-2xl">
              $120
            </strong>
            <del
              aria-label="old price"
              className="text-2xl font-bold text-gray-400"
            >
              $220
            </del>
            <div
              aria-label="20% discount"
              className="bg-pink-red/10 text-pink-red py-1 px-4 rounded-full w-fit"
            >
              20%
            </div>
          </div>

          {/* Product description */}
          <p className="text-muted-foreground mt-6">
            This graphic t-shirt which is perfect for any occasion. Crafted from
            a soft and breathable fabric, it offers superior comfort and style.
          </p>
          <ProductOptions />
        </div>
      </div>
      <ProductReviews />
      <MightLike/>
    </main>
  );
}

export default ProductPage;

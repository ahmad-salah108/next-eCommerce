import CardProduct from "@/components/CardProduct";
import { Button } from "@/components/ui/button";

function TopSelling() {
  // const OPTIONS: EmblaOptionsType = { dragFree: true };
  const SLIDES = Array.from({ length: 4 }).map((_, i) => (
    <CardProduct
      key={i}
      className={`
        mx-auto sm:mx-0
      ${i === 1 ? "hidden sm:block" : i === 2 ? "hidden lg:block" : i === 3 ? "hidden 2xl:block" : ""}               
    `}
    />
  ));

  return (
    <section className="container mx-auto py-12 md:py-20 lg:py-24">
      <h2 className="font-black text-4xl md:text-5xl text-center mb-12 uppercase">
        Top Selling
      </h2>
      <div className="flex justify-between items-center">{SLIDES}</div>
      {/* <EmblaCarousel
        slides={SLIDES}
        options={OPTIONS}
        slideSizes="[--slide-size:100%] sm:[--slide-size:50%] lg:[--slide-size:calc(100%/3)] 2xl:[--slide-size:calc(25%)]"
      /> */}
      <Button
        variant={"outline"}
        size={"lg"}
        className="flex mx-auto rounded-full text-[1rem] px-16 py-6 cursor-pointer mt-12"
      >
        View All
      </Button>
    </section>
  );
}

export default TopSelling;

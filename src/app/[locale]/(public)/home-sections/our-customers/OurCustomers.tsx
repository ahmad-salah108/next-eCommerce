import CardReview from "@/components/CardReview";
import EmblaCarousel from "@/components/embla-carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import React from "react";

function OurCustomers() {
  const OPTIONS: EmblaOptionsType = { dragFree: true };
  const SLIDES = Array.from({ length: 5 }).map((_, i) => (
    <CardReview key={i} />
  ));

  return (
    <section className="container mx-auto py-12 md:py-20 lg:py-24">
      <h2 className="font-black text-4xl md:text-5xl mb-12 uppercase">
        Our Happy Customers
      </h2>
      <EmblaCarousel
        slides={SLIDES}
        options={OPTIONS}
        slideSizes="[--slide-size:100%] md:[--slide-size:50%] 2xl:[--slide-size:calc(100%/3)]"
      />
    </section>
  );
}

export default OurCustomers;

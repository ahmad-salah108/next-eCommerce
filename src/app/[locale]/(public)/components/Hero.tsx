import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getFontClassName } from "@/lib/utils";
import Image from "next/image";

async function Hero({ locale }: { locale: string }) {
  return (
    <section className="bg-warm-gray md:bg-[url('/assets/images/hero.png')] bg-center bg-cover">
      <div className="container mx-auto pt-[40px] md:pt-[100px]">
        <h1
          className={`${getFontClassName(
            locale
          )} font-black text-4xl md:text-6xl uppercase`}
        >
          Find clothes
          <br />
          that matches
          <br />
          your style
        </h1>
        <p className="text-muted-foreground mt-5 max-w-[500px] text-balance">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <Button className="rounded-full w-full py-8 mt-5 text-[1.1rem]">
          Shop Now
        </Button>
        <div className="flex flex-wrap justify-center items-center gap-8 mt-5">
          <div>
            <strong className="text-3xl">
              {(200).toLocaleString("en-US")}+
            </strong>
            <br />
            <small className="text-muted-foreground">
              International Brands
            </small>
          </div>
          <Separator orientation="vertical" className="h-10!" />
          <div>
            <strong className="text-3xl">
              {(2000).toLocaleString("en-US")}+
            </strong>
            <br />
            <small className="text-muted-foreground">
              High-Quality Products
            </small>
          </div>
          <Separator orientation="vertical" className="hidden xs:block h-10!" />
          <div>
            <strong className="text-3xl">
              {(30000).toLocaleString("en-US")}+
            </strong>
            <br />
            <small className="text-muted-foreground">Happy Customers</small>
          </div>
        </div>
      </div>
      <div aria-hidden className="relative">
        <Image src={"/assets/icons/star.svg"} alt="" width={60} height={60} />
        <Image src={"/assets/icons/star.svg"} alt="" width={30} height={30} />
        <Image
          src={"/assets/images/hero-mobile.png"}
          alt=""
          width={370}
          height={370}
          preload
          className="mx-auto w-full md:hidden"
        />
      </div>
    </section>
  );
}

export default Hero;

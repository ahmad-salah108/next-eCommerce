import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getFontClassName } from "@/lib/utils/getFontClassName";
import Image from "next/image";

async function Hero({ locale }: { locale: string }) {
  return (
    <section className="bg-warm-gray lg:bg-[url('/assets/images/hero.png')] bg-center bg-cover bg-no-repeat overflow-hidden">
      <div className="container mx-auto pt-[40px] md:pt-[80px] md:pb-8 relative">
        <Image
          src={"/assets/icons/star.svg"}
          alt=""
          width={100}
          height={100}
          className="hidden lg:block 3xl:hidden absolute -end-40 xl:end-0 top-15"
        />
        <Image
          src={"/assets/icons/star.svg"}
          alt=""
          width={60}
          height={60}
          className="hidden lg:block 3xl:hidden absolute start-160 xl:start-200 top-80"
        />
        <h1
          className={`${getFontClassName(
            locale
          )} font-black text-4xl leading-12 md:text-6xl md:leading-19 uppercase`}
        >
          Find clothes
          <br />
          that matches
          <br />
          your style
        </h1>
        <p className="text-muted-foreground mt-5 max-w-[550px] text-pretty">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <Button className="rounded-full w-full md:w-fit py-7 px-16 mt-8 text-[1.1rem] cursor-pointer">
          Shop Now
        </Button>
        <div
          className="flex flex-wrap justify-center md:justify-start items-center gap-8 mt-8 md:mt-16 md:mb-20"
        >
          <div aria-label="We have more than 200 of International Brands">
            <strong className="text-3xl md:text-[2.6rem]">
              {(200).toLocaleString("en-US")}+
            </strong>
            <p className="text-muted-foreground text-sm md:text-[1rem]">
              International Brands
            </p>
          </div>
          <Separator orientation="vertical" className="h-10!" />
          <div aria-label="We have more than 2000 of High-Quality Products">
            <strong className="text-3xl md:text-[2.6rem]">
              {(2000).toLocaleString("en-US")}+
            </strong>
            <p className="text-muted-foreground text-sm md:text-[1rem]">
              High-Quality Products
            </p>
          </div>
          <Separator orientation="vertical" className="hidden xs:block h-10!" />
          <div aria-label="We have more than 30000 of Happy Customers">
            <strong className="text-3xl md:text-[2.6rem]">
              {(30000).toLocaleString("en-US")}+
            </strong>
            <p className="text-muted-foreground text-sm md:text-[1rem]">
              Happy Customers
            </p>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="lg:hidden relative z-1 mt-5 xs:w-[400px] mx-auto"
      >
        <Image
          src={"/assets/icons/star.svg"}
          alt=""
          width={70}
          height={70}
          className="absolute end-10 top-15"
        />
        <Image
          src={"/assets/icons/star.svg"}
          alt=""
          width={40}
          height={40}
          className="absolute start-10 top-40"
        />
        <Image
          src={"/assets/images/hero-mobile.png"}
          alt=""
          width={370}
          height={370}
          preload
          className="mx-auto w-[400px]"
        />
      </div>
      <div aria-label="brands we deliver" className="bg-black">
        <div
          className="container mx-auto flex justify-center lg:justify-between items-center flex-wrap gap-x-6 gap-y-8 py-10 *:w-auto *:h-[25px]"
        >
          <Image
            src={"/assets/icons/brands/versace.svg"}
            alt="versace brand"
            width={100}
            height={30}
          />
          <Image
            src={"/assets/icons/brands/zara.svg"}
            alt="zara brand"
            width={100}
            height={30}
          />
          <Image
            src={"/assets/icons/brands/gucci.svg"}
            alt="gucci brand"
            width={100}
            height={30}
          />
          <Image
            src={"/assets/icons/brands/prada.svg"}
            alt="prada brand"
            width={100}
            height={30}
          />
          <Image
            src={"/assets/icons/brands/ck.svg"}
            alt="calvin klein brand"
            width={100}
            height={30}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;

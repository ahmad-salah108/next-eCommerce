import Image from "next/image";
import { Rating, RatingButton } from "./ui/shadcn-io/rating";

function CardProduct() {
  return (
    <div
      className="w-fit p-3 rounded-main border-3 border-transparent hover:shadow-md cursor-pointer transition-all duration-300"
    >
      <div className="relative bg-warm-gray rounded-main overflow-hidden w-[190px] h-[190px] md:w-[250px] md:h-[250px]">
        <Image
          src={"/assets/images/shirt.png"}
          alt=""
          fill
          sizes="(max-width: 767px) 190px, 290px"
        />
      </div>
      <p className="text-xl font-semibold mt-4">T-shirt with Tape Details</p>
      <div className="flex items-center gap-2 mt-2">
        <Rating value={4} readOnly aria-label="Rating: 4 out of 5 stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton className="text-yellow-500" key={index} />
          ))}
        </Rating>
        <p className="translate-y-px" aria-hidden>
          4/<span className="text-muted-foreground">5</span>
        </p>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <strong aria-label="new price" className="text-2xl">$120</strong>
        <del aria-label="old price" className="text-2xl font-bold text-gray-400">$220</del>
        <div
          aria-label="20% discount"
          className="bg-pink-red/10 text-pink-red py-1 px-4 rounded-full w-fit"
        >
          20%
        </div>
      </div>
    </div>
  );
}

export default CardProduct;

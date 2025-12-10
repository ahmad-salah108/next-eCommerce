import Image from "next/image";
import React from "react";

function ProductImage({ n }: { n: number }) {
  return (
    <div className="relative mx-auto bg-warm-gray rounded-main overflow-hidden w-[190px] h-[190px] md:w-[250px] md:h-[250px]">
      <Image
        src={`/assets/images/shirt${n}.png`}
        alt=""
        fill
        sizes="(max-width: 767px) 190px, 290px"
        className="object-cover"
      />
    </div>
  );
}

export default ProductImage;

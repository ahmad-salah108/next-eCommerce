import Image from "next/image";

function Thumbnail({ n }: { n: number }) {
  return (
    <div className="flex justify-center items-center relative bg-warm-gray rounded-main overflow-hidden min-w-[70px] min-h-[70px] md:min-w-[100px] md:min-h-[100px]">
      <Image
        src={`/assets/images/shirt${n}.png`}
        alt=""
        fill
        className="object-cover"
        // width={80}
        // height={80}
        // className="object-cover w-[60px] h-[60px] md:w-[80px] md:h-[80px]"
      />
    </div>
  );
}

export default Thumbnail;

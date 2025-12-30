"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function Banner() {
  return (
    <div
      id="banner"
      role="banner"
      className="bg-black text-white text-center py-2 text-[14px] font-light flex justify-center items-center"
    >
      <small className="flex-1">
        Sign up and get 20% off to your first order.{" "}
        <Link href={"/sign-up"} className="underline font-normal">Sign Up Now</Link>
      </small>
      <Button
        aria-label="Banner hide button"
        variant={"ghost"}
        size={"icon-sm"}
        className="hover:bg-black h-fit w-fit p-1 ms-auto me-4 cursor-pointer"
        onClick={()=>{
          document.getElementById("banner")?.classList.add("hidden")
        }}
      >
        <Image src={"/assets/icons/close.svg"} alt="" width={14} height={14} />
      </Button>
    </div>
  );
}

export default Banner;

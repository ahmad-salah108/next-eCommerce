import Link from "next/link";
import SubscribeToNewsletter from "./components/SubscribeToNewsletter";
import { Button } from "@/components/ui/button";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

const FooterLinks = ()=>(
  <div className="flex flex-col gap-4 w-1/3 md:w-fit">
    <h3 className="uppercase tracking-[0.2em] font-semibold">Company</h3>
    <Link href={"#"} className="text-muted-foreground">
      About
    </Link>
    <Link href={"#"} className="text-muted-foreground">
      Features
    </Link>
    <Link href={"#"} className="text-muted-foreground">
      Work
    </Link>
    <Link href={"#"} className="text-muted-foreground">
      Career
    </Link>
  </div>
);

function Footer() {
  return (
    <div>
      <SubscribeToNewsletter />
      <footer className="bg-warm-gray">
        <div className="container mx-auto pt-60 lg:pt-45 pb-10">
          <div className="flex justify-between flex-wrap gap-8 mb-16">
            <div className="flex flex-col justify-between items-start gap-4 w-full md:w-1/3">
              <Link
                href="/"
                aria-label="Website logo"
                className="block cursor-pointer"
              >
                <p className={`font-black text-2xl lg:text-3xl`}>SHOP.CO</p>
              </Link>
              <p className="text-muted-foreground">
                We have clothes that suits your style and which you’re proud to
                wear. From women to men.
              </p>
              <div className="flex justify-center items-center gap-4">
                <Button
                  variant={"outline"}
                  size={"icon-lg"}
                  className="rounded-full cursor-pointer"
                >
                  <Facebook />
                </Button>
                <Button
                  variant={"outline"}
                  size={"icon-lg"}
                  className="rounded-full cursor-pointer"
                >
                  <Instagram />
                </Button>
                <Button
                  variant={"outline"}
                  size={"icon-lg"}
                  className="rounded-full cursor-pointer"
                >
                  <Github />
                </Button>
                <Button
                  variant={"outline"}
                  size={"icon-lg"}
                  className="rounded-full cursor-pointer"
                >
                  <Linkedin />
                </Button>
              </div>
            </div>
            <FooterLinks/>
            <FooterLinks/>
            <FooterLinks/>
            <FooterLinks/>
          </div>
          <hr/>
          <div className="mt-4 flex justify-between items-center flex-wrap gap-4">
            <small className="text-muted-foreground">Shop.co &copy; 2000-2021, All rights reserved</small>
            <div className="flex items-center gap-1">
              <Link href={"#"}><Image src={"/assets/icons/payments/visa.svg"} alt="" width={50} height={30}/></Link>
              <Link href={"#"}><Image src={"/assets/icons/payments/mastercard.svg"} alt="" width={50} height={30}/></Link>
              <Link href={"#"}><Image src={"/assets/icons/payments/paypal.svg"} alt="" width={50} height={30}/></Link>
              <Link href={"#"}><Image src={"/assets/icons/payments/applepay.svg"} alt="" width={50} height={30}/></Link>
              <Link href={"#"}><Image src={"/assets/icons/payments/googlepay.svg"} alt="" width={50} height={30}/></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

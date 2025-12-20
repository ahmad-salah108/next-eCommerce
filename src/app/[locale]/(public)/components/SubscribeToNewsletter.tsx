import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";

function SubscribeToNewsletter() {
  return (
    <section className="container mx-auto -mt-20 lg:-mt-10">
      <div className="flex justify-between items-center flex-wrap rounded-main bg-black py-10 px-16 gap-y-8 translate-y-1/2">
        <h2 className="text-white font-black text-4xl md:text-5xl uppercase w-full lg:w-[60%]">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <div className="flex flex-col gap-4 w-full lg:w-[35%]">
          <label className="flex gap-3 rounded-full bg-white py-3 px-4 text-[14px] transition ease-out duration-300">
            <MailIcon className="text-gray-400"/>
            <input
              type="text"
              name="email"
              placeholder="Enter your email address"
              className="border-none outline-none transition ease-out duration-300"
              style={{ width: "100%" }}
            />
          </label>
          <Button size={"lg"} className="bg-white rounded-full text-black py-6 cursor-pointer hover:bg-gray-100 text-[1rem]">Subscribe to Newsletter</Button>
        </div>
      </div>
    </section>
  );
}

export default SubscribeToNewsletter;

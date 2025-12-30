import React from "react";

function DressStyles() {
  return (
    <section className="container mx-auto py-12 md:py-20 lg:py-24">
      <div className="bg-warm-gray px-10 py-16 rounded-main">
        <h2 className="font-black text-4xl md:text-5xl text-center mb-12 uppercase">
          Browse By Dress Style
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-8 rounded-main col-span-3 lg:col-span-1 h-[190px] md:h-[250px] bg-[url('/assets/images/casual.png')] bg-cover bg-top bg-no-repeat cursor-pointer">
            <h3 className="font-semibold text-2xl md:text-4xl">Casual</h3>
          </div>
          <div className="bg-white p-8 rounded-main col-span-3 lg:col-span-2 h-[190px] md:h-[250px] bg-[url('/assets/images/formal.png')] bg-cover bg-top bg-no-repeat cursor-pointer">
            <h3 className="font-semibold text-2xl md:text-4xl">Formal</h3>
          </div>
          <div className="bg-white p-8 rounded-main col-span-3 lg:col-span-2 h-[190px] md:h-[250px] bg-[url('/assets/images/party.png')] bg-cover bg-top bg-no-repeat cursor-pointer">
            <h3 className="font-semibold text-2xl md:text-4xl">Party</h3>
          </div>
          <div className="bg-white p-8 rounded-main col-span-3 lg:col-span-1 h-[190px] md:h-[250px] bg-[url('/assets/images/gym.png')] bg-cover bg-top bg-no-repeat cursor-pointer">
            <h3 className="font-semibold text-2xl md:text-4xl">Gym</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DressStyles;

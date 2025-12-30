"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag, ArrowRight } from "lucide-react";

export default function OrderSummary() {
  return (
    <div className="border border-gra-200 rounded-[20px] p-5 md:p-6 space-y-6">
      <h2 className="text-xl md:text-2xl font-bold">Order Summary</h2>

      <div className="space-y-5">
        <div className="flex justify-between items-center text-base">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-bold">$565</span>
        </div>
        <div className="flex justify-between items-center text-base">
          <span className="text-gray-500">Discount (-20%)</span>
          <span className="font-bold text-red-500">-$113</span>
        </div>
        <div className="flex justify-between items-center text-base">
          <span className="text-gray-500">Delivery Fee</span>
          <span className="font-bold">$15</span>
        </div>
        <hr className="border-gray-200" />
        <div className="flex justify-between items-center text-xl">
          <span className="text-black">Total</span>
          <span className="font-bold">$467</span>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 md:w-6 md:h-6" />
          <input
            type="text"
            placeholder="Add promo code"
            className="w-full bg-[#F0F0F0] rounded-[62px] pl-12 md:pl-14 pr-4 py-3 md:py-3.5 outline-none focus:ring-2 focus:ring-black/5 transition-all text-sm md:text-base"
          />
        </div>
        <Button className="rounded-[62px] bg-black text-white px-6 md:px-9 py-3 md:py-3.5 text-sm md:text-base font-medium hover:bg-black/90 h-auto">
          Apply
        </Button>
      </div>

       <Button className="w-full rounded-[62px] bg-black text-white py-4 md:py-4.5 text-sm md:text-base font-medium hover:bg-black/90 flex items-center justify-center gap-2 h-auto mt-4 group">
          Go to Checkout
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Button>
    </div>
  );
}

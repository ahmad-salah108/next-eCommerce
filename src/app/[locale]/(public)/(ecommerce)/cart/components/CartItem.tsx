"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type CartItemType = {
  id: string;
  image: string;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
};

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <div className="flex gap-4 md:gap-6 py-4 md:py-6 border-b border-gray-100 last:border-0 border-solid">
      {/* Image */}
      <div className="relative w-24 h-24 md:w-[124px] md:h-[124px] rounded-[8.66px] overflow-hidden bg-warm-gray shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between py-1">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-base md:text-xl font-bold">{item.name}</h3>
            <p className="text-xs md:text-sm text-black">
              <span className="font-normal">Size: </span>
              <span className="text-gray-500 font-normal">{item.size}</span>
            </p>
            <p className="text-xs md:text-sm text-black">
              <span className="font-normal">Color: </span>
              <span className="text-gray-500 font-normal">{item.color}</span>
            </p>
          </div>
          <button className="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer" aria-label="Delete item">
            <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div className="flex justify-between items-end mt-2">
          <div className="text-xl md:text-2xl font-bold">${item.price}</div>
          
          {/* Quantity Stepper */}
           <div className="flex items-center bg-[#F0F0F0] rounded-[62px] px-3 md:px-4 py-2 md:py-3 gap-4 md:gap-5">
            <button
               onClick={() => setQuantity(Math.max(1, quantity - 1))}
               className="hover:text-black text-gray-800 transition-colors md:w-5 md:h-5 w-4 h-4 flex items-center justify-center cursor-pointer"
               aria-label="Decrease quantity"
            >
              <Minus className="w-full h-full" />
            </button>
            <span className="text-sm md:text-base font-medium min-w-[1ch] text-center">{quantity}</span>
            <button
               onClick={() => setQuantity(quantity + 1)}
               className="hover:text-black text-gray-800 transition-colors md:w-5 md:h-5 w-4 h-4 flex items-center justify-center cursor-pointer"
               aria-label="Increase quantity"
            >
              <Plus className="w-full h-full" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

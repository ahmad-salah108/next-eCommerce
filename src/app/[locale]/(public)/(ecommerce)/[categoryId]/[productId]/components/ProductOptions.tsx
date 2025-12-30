"use client";

import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COLORS = [
  { name: "brown", value: "#4F4631" },
  { name: "green", value: "#314F4A" },
  { name: "blue", value: "#31344F" },
];

const SIZES = ["Small", "Medium", "Large", "X-Large"];

export default function ProductOptions() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-6">
      <hr className="border-gray-200 my-6" />
      
      {/* Colors */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground text-base">Select Colors</h3>
        <div className="flex gap-4">
          {COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all ring-offset-2 hover:ring-2 hover:ring-black/10 focus:outline-none focus:ring-2 focus:ring-black/20"
              style={{ backgroundColor: color.value }}
              aria-label={`Select ${color.name}`}
            >
              {selectedColor.name === color.name && (
                <Check className="text-white/90 w-5 h-5" strokeWidth={3} />
              )}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-200 my-6" />

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground text-base">Choose Size</h3>
        <div className="flex flex-wrap gap-3">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "px-6 py-3 rounded-full text-sm transition-all font-medium cursor-pointer",
                selectedSize === size
                  ? "bg-black text-white"
                  : "bg-gray-150 text-gray-600 hover:bg-gray-200"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-200 my-6" />

      {/* Quantity and Add to Cart */}
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-between bg-gray-150 rounded-full px-4 py-2 w-32 md:w-37">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            aria-label="Decrease quantity"
            className="hover:text-black text-gray-800 transition-colors cursor-pointer"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="text-lg font-medium text-center pointer-events-none select-none">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            aria-label="Increase quantity"
            className="hover:text-black text-gray-800 transition-colors cursor-pointer"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <Button className="flex-1 rounded-full text-base py-[1.45rem] bg-black hover:bg-black/90 text-white font-medium cursor-pointer">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

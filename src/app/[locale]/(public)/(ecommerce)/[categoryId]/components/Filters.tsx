"use client";

import React, { useState } from "react";
import { SlidersHorizontal, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CATEGORIES = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];

const COLORS = [
  { name: "Green", value: "#00C12B" },
  { name: "Red", value: "#F50606" },
  { name: "Yellow", value: "#F5DD06" },
  { name: "Orange", value: "#F57906" },
  { name: "Cyan", value: "#06CAF5" },
  { name: "Blue", value: "#063AF5" },
  { name: "Purple", value: "#7D06F5" },
  { name: "Pink", value: "#F506A4" },
  { name: "White", value: "#FFFFFF" },
  { name: "Black", value: "#000000" },
];

const SIZES = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

const STYLES = ["Casual", "Formal", "Party", "Gym"];

export default function Filters() {
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [selectedColor, setSelectedColor] = useState("Blue");
  const [selectedSize, setSelectedSize] = useState("Large");

  return (
    <div className="border border-gra-200 rounded-main p-6 space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <h2 className="text-xl font-bold">Filters</h2>
        <SlidersHorizontal className="w-6 h-6 text-gray-400" />
      </div>

      {/* Categories (Top List) */}
      <div className="space-y-4 pb-6 border-b border-gray-200">
        {CATEGORIES.map((category) => (
          <label key={category} className="flex items-center justify-between cursor-pointer">
            <span className="text-gray-600">{category}</span>
             <Checkbox className="rounded-sm w-4 h-4 border-gray-300" />
          </label>
        ))}
      </div>

      <Accordion type="multiple" defaultValue={["price", "colors", "size", "style"]} className="w-full">
        
        {/* Price Filter */}
        <AccordionItem value="price" className="border-b border-gray-200">
          <AccordionTrigger className="text-xl font-bold hover:no-underline">Price</AccordionTrigger>
          <AccordionContent className="px-1 py-4">
            <Slider
              defaultValue={[50, 200]}
              max={500}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-4"
            />
            <div className="flex items-center justify-between text-black font-medium">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Colors Filter */}
        <AccordionItem value="colors" className="border-b border-gray-200">
          <AccordionTrigger className="text-xl font-bold hover:no-underline">Colors</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-3 pt-2 ps-3">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-all border border-black/10 ring-offset-2 hover:ring-2 hover:ring-black/10 focus:outline-none cursor-pointer",
                    selectedColor === color.name && "ring-2 ring-black/20"
                  )}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select ${color.name}`}
                >
                  {selectedColor === color.name && (
                    <Check
                      className={cn(
                        "w-4 h-4",
                        color.name === "White" ? "text-black" : "text-white"
                      )}
                      strokeWidth={3}
                    />
                  )}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Size Filter */}
        <AccordionItem value="size" className="border-b border-gray-200">
          <AccordionTrigger className="text-xl font-bold hover:no-underline">Size</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer",
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-[#F0F0F0] text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

         {/* Dress Style Filter */}
         <AccordionItem value="style" className="border-0">
          <AccordionTrigger className="text-xl font-bold hover:no-underline">Dress Style</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              {STYLES.map((style) => (
                <label key={style} className="flex items-center justify-between cursor-pointer">
                  <span className="text-gray-600">{style}</span>
                   <Checkbox className="rounded-sm w-4 h-4 border-gray-300" />
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full rounded-full bg-black text-white py-6 text-base font-medium hover:bg-black/90 cursor-pointer">
        Apply Filter
      </Button>
    </div>
  );
}

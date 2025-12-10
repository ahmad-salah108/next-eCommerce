"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import ReviewCard, { Review } from "./ReviewCard";

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    author: "Samantha D.",
    rating: 4.5,
    text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    date: "August 14, 2023",
    verified: true,
  },
  {
    id: "2",
    author: "Alex M.",
    rating: 5,
    text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    date: "August 15, 2023",
    verified: true,
  },
  {
    id: "3",
    author: "Ethan R.",
    rating: 3.5,
    text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
    date: "August 16, 2023",
    verified: true,
  },
  {
    id: "4",
    author: "Olivia P.",
    rating: 5,
    text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
    date: "August 17, 2023",
    verified: true,
  },
  {
    id: "5",
    author: "Liam K.",
    rating: 5,
    text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
    date: "August 18, 2023",
    verified: true,
  },
  {
    id: "6",
    author: "Ava H.",
    rating: 5,
    text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
    date: "August 19, 2023",
    verified: true,
  },
];

export default function ProductReviews() {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);

  return (
    <div className="mt-20">
      <Tabs defaultValue="reviews" className="w-full">
        <div className="border-b border-gray-200 mb-8">
            <TabsList className="bg-transparent h-auto p-0 gap-8 md:gap-16 w-full justify-between md:justify-center flex-nowrap overflow-auto no-scrollbar">
            <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:shadow-none p-4 text-base md:text-xl text-gray-500 font-normal data-[state=active]:text-black transition-colors flex-1 cursor-pointer"
            >
                Product Details
            </TabsTrigger>
            <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:shadow-none p-4 text-base md:text-xl text-gray-500 font-normal data-[state=active]:text-black transition-colors flex-1 cursor-pointer"
            >
                Rating & Reviews
            </TabsTrigger>
            <TabsTrigger
                value="faqs"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:shadow-none p-4 text-base md:text-xl text-gray-500 font-normal data-[state=active]:text-black transition-colors flex-1 cursor-pointer"
            >
                FAQs
            </TabsTrigger>
            </TabsList>
        </div>

        <TabsContent value="reviews" className="space-y-6">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              All Reviews
              <span className="text-gray-400 text-base font-normal">(451)</span>
            </h3>
            <div className="flex gap-3 w-fit">
              {/* <Button variant="secondary" className="rounded-full bg-[#f0f0f0] w-12 h-12 p-0 flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5" />
              </Button> */}
              {/* <Button variant="secondary" className="rounded-full bg-[#f0f0f0] px-6 text-base font-medium flex items-center gap-2">
                Latest <ChevronDown className="w-4 h-4" />
              </Button> */}
              <Button className="rounded-full bg-black text-white px-8 py-6 text-base font-medium ml-auto md:ml-0 cursor-pointer">
                Write a Review
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              className="rounded-full px-10 py-6 text-base font-medium border-gray-200 hover:bg-gray-50"
            >
              Load More Reviews
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="details">
          <div className="py-8 text-center text-gray-500">
            Product details content would go here.
          </div>
        </TabsContent>

        <TabsContent value="faqs">
          <div className="py-8 text-center text-gray-500">
            FAQs content would go here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

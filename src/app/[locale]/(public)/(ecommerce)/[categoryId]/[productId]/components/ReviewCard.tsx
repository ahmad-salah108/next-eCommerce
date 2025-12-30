"use client";

import { Star, CheckCircle2, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
};

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="border border-gray-100 rounded-main p-6 md:p-8 flex flex-col gap-4 h-full">
      <div className="flex justify-between items-start">
        <div className="flex gap-1 text-yellow-400">
          <Rating value={4} readOnly aria-label="Rating: 4 out of 5 stars">
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingButton className="text-yellow-500" key={index} />
            ))}
          </Rating>
        </div>
        <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <h4 className="font-bold text-lg">{review.author}</h4>
        {review.verified && (
          <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500/10" />
        )}
      </div>

      <p className="text-gray-600 leading-relaxed text-[15px] flex-1">
        &quot;{review.text}&quot;
      </p>

      <div className="text-gray-400 text-sm font-medium mt-2">
        Posted on {review.date}
      </div>
    </div>
  );
}

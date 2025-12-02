import React from "react";
import { Rating, RatingButton } from "./ui/shadcn-io/rating";

function CardReview() {
  return (
    <div className="p-8 border-2 border-warm-gray rounded-main max-w-[400px]">
      <Rating value={5} readOnly aria-label="Rating: 5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingButton className="text-yellow-500" key={index} />
        ))}
      </Rating>
      <strong className="block mt-1 text-xl">Sarah M.</strong>
      <p className="text-muted-foreground mt-2">
        &quot;I&apos;m blown away by the quality and style of the clothes I received from
        Shop.co. From casual wear to elegant dresses, every piece I&apos;ve bought
        has exceeded my expectations.”
      </p>
    </div>
  );
}

export default CardReview;

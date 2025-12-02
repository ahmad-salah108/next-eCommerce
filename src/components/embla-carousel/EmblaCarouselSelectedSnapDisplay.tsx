import React, {
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react";
import { EmblaCarouselType } from "embla-carousel";

type UseSelectedSnapDisplayType = {
  selectedSnap: number;
  snapCount: number;
};

export const useSelectedSnapDisplay = (
  emblaApi: EmblaCarouselType | undefined
): UseSelectedSnapDisplayType => {
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const updateScrollSnapState = useCallback((emblaApi: EmblaCarouselType) => {
    setSnapCount(emblaApi.scrollSnapList().length);
    setSelectedSnap(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    // Ensure state updates happen after React finishes the current render cycle
    startTransition(() => {
      updateScrollSnapState(emblaApi);
      emblaApi.on("select", updateScrollSnapState);
      emblaApi.on("reInit", updateScrollSnapState);
    });

    return () => {
      emblaApi.off("select", updateScrollSnapState);
      emblaApi.off("reInit", updateScrollSnapState);
    };
  }, [emblaApi, updateScrollSnapState]);

  return {
    selectedSnap,
    snapCount,
  };
};

type PropType = {
  selectedSnap: number;
  snapCount: number;
};

export const SelectedSnapDisplay: React.FC<PropType> = (props) => {
  const { selectedSnap, snapCount } = props;

  return (
    <div className="embla__selected-snap-display">
      {selectedSnap + 1} / {snapCount}
    </div>
  );
};

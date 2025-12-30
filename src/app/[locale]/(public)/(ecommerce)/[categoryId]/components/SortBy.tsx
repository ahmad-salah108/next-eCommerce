import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SortBy() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value="most-popular">Most Popular</SelectItem>
          <SelectItem value="highest-price">Highest Price</SelectItem>
          <SelectItem value="lowest-price">Lowest Price</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SortBy;

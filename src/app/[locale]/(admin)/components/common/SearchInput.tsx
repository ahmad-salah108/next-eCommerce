"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Input from "../form/input/InputField";

export default function SearchInput({placeholder}:{placeholder: string}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("q", value);
      params.set("page", "1"); // reset pagination on new search
    } else {
      params.delete("q");
    }

    router.push(`?${params.toString()}`);
  }, 400);

  return (
    <div className="w-full max-w-[500px]">
      <Input
        type="text"
        placeholder={placeholder}
        defaultValue={searchParams.get("q") ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}

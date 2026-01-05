"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant={"outline"}
      onClick={() => router.back()}
      className="dark:border-gray-700 flex justify-center items-center gap-2 text-gray-500 dark:text-gray-400"
    >
      <ArrowLeftIcon className="w-4 h-4" /> Back
    </Button>
  );
}

export default BackButton;

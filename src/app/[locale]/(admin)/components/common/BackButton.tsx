"use client";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import StyledButton from "./StyledButton";

function BackButton() {
  const router = useRouter();
  return (
    <StyledButton
      onClick={() => router.back()}
      className="flex justify-center items-center gap-2 "
    >
      <ArrowLeftIcon className="w-4 h-4" /> Back
    </StyledButton>
  );
}

export default BackButton;

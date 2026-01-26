"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function CreateToastHandler({message, urlToReplace}:{message: string, urlToReplace: string}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("created") === "true") {
      toast.success(message);
      // Clean up the URL by removing the query param
      router.replace(urlToReplace);
    }
  }, [searchParams, router]);

  return null;
}



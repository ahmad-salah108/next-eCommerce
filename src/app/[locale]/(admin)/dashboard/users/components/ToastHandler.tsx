"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function ToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("updated") === "true") {
      toast.success("User updated successfully!");
      // Clean up the URL by removing the query param
      router.replace("/dashboard/users");
    }
  }, [searchParams, router]);

  return null;
}



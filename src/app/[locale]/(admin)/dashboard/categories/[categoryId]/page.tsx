"use client";
import { getCategoryById } from "@/lib/actions/categories/getCategoryById";
import { useQuery } from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";
import { use, useEffect } from "react";

function CategoryIdPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = use(params);
  const { data, error } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getCategoryById(categoryId),
  });

  if (error) notFound();

  useEffect(() => {
    if (data?.slug) redirect(`/dashboard/categories/${categoryId}/${data?.slug}`);
  }, [data?.slug, categoryId]);

  return (
    <h1 className="dark:text-white/90">Loading...</h1>
  )
}

export default CategoryIdPage;

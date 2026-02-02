"use client";
import { getProductById } from "@/lib/actions/products/getProductById";
import { useQuery } from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";
import { use, useEffect } from "react";

function ProductIdPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = use(params);
  const { data, error } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
  });

  if (error) notFound();

  useEffect(() => {
    if (data?.slug) redirect(`/dashboard/products/${productId}/${data?.slug}`);
  }, [data?.slug, productId]);

  return (
    <h1 className="dark:text-white/90">Loading...</h1>
  )
}

export default ProductIdPage;

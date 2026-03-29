"use client";
import BackButton from "../../../../components/common/BackButton";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProductEditForm from "./components/ProductEditForm";
import ProductEditFormSkeleton from "./components/ProductEditFormSkeleton";
import { getProductById } from "@/lib/actions/products/getProductById";
import { QUERY_KEYS } from "@/constants/query-keys";

type Props = {
  productId: string;
};

function ProductEditPage({ productId }: Props) {
  const { data, isPending, error } = useQuery({
    queryKey: QUERY_KEYS.products.details(productId),
    queryFn: () => getProductById(productId),
  });
  const categoryIds = data?.product_categories?.map(c => Number(c.id)) ?? []

  if (error) notFound();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-8 mb-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Edit Product
        </h2>
        <BackButton />
      </div>
      {isPending ? <ProductEditFormSkeleton /> : <ProductEditForm product={data} categoryIds={categoryIds} />}
    </div>
  );
}

export default ProductEditPage;

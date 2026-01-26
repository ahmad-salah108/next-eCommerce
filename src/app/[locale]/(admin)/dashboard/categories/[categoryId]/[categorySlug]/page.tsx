"use client";
import BackButton from "../../../../components/common/BackButton";
import { notFound } from "next/navigation";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "@/lib/actions/categories/getCategoryById";
import CategoryEditForm from "./components/CategoryEditForm";
import CategoryEditFormSkeleton from "./components/CategoryEditFormSkeleton";

type Props = {
  params: Promise<{ categoryId: string }>;
};

function CategoryIdPage({ params }: Props) {
  const { categoryId } = use(params);
  const { data, isPending, error } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getCategoryById(categoryId),
  });

  if (error) notFound();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-8 mb-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Edit Category
        </h2>
        <BackButton />
      </div>
      {isPending ? <CategoryEditFormSkeleton /> : <CategoryEditForm category={data} />}
    </div>
  );
}

export default CategoryIdPage;

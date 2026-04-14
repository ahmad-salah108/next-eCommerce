"use client";
import BackButton from "../../../../components/common/BackButton";
import { notFound } from "next/navigation";
import CategoryEditForm from "./components/CategoryEditForm";
import CategoryEditFormSkeleton from "./components/CategoryEditFormSkeleton";
import useCategoryDetailsQuery from "@/hooks/queries/categories/useCategoryDetailsQuery";

type Props = {
  categoryId: string;
};

function CategoryEditPage({ categoryId }: Props) {
  const { data, isPending, error } = useCategoryDetailsQuery({id: categoryId})

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

export default CategoryEditPage;

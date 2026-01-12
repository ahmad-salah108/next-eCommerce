import CategoryEditForm from "./components/CategoryEditForm";
import BackButton from "../../../components/common/BackButton";
import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/actions/categories/getCategoryById";

type Props = {
  params: Promise<{ categoryId: string }>;
};

async function CategoryIdPage({ params }: Props) {
  const { categoryId } = await params;
  const {category, error} = await getCategoryById(categoryId);

  if(error) notFound()

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-8 mb-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Edit Category
        </h2>
        <BackButton />
      </div>
      <CategoryEditForm category={category} />
    </div>
  );
}

export default CategoryIdPage;

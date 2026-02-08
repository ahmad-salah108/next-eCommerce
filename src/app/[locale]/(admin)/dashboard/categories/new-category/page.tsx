"use client";
import CategoryCreateForm from "./components/CategoryCreateForm";
import BackButton from "../../../components/common/BackButton";

function NewCategoryPage() {

  return (
    <div>
      <title>New Category | SHOPYA</title>
      <div className="flex flex-wrap items-center justify-between gap-8 mb-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Create New Category
        </h2>
        <BackButton />
      </div>
      <CategoryCreateForm />
    </div>
  );
}

export default NewCategoryPage;

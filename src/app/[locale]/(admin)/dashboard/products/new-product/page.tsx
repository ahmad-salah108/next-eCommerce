"use client";

import ProductCreateForm from "./components/ProductCreateForm";
import BackButton from "../../../components/common/BackButton";

function NewProductPage() {
  return (
    <div>
      <title>New Product | SHOPYA</title>
      <div className="flex flex-wrap items-center justify-between gap-8 mb-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Create New Product
        </h2>
        <BackButton />
      </div>
      <ProductCreateForm />
    </div>
  );
}

export default NewProductPage;

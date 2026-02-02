import { Modal } from "../../../components/ui/modal";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/ProductType";
import Image from "next/image";
import Link from "next/link";
import Badge from "../../../components/ui/badge/Badge";
import React from "react";
import { routing } from "@/i18n/routing";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  product: ProductType;
  locale: typeof routing.locales[number];
};

function ProductViewModal({ isModalOpen, closeModal, product, locale }: Props) {
  const date = new Date(product.created_at);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      className="max-w-[600px] p-5 lg:p-10 cursor-auto max-h-screen"
    >
      <div className="max-h-[65vh] mt-10 overflow-auto">
        {/* Product's Name */}
        <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">
          {product.name[locale]}
        </h4>

        {/* Product's Main Image */}
        <p className="mb-2 text-[1rem] leading-6 font-semibold text-gray-700 dark:text-gray-200">
          Main Image
        </p>
        <div className="mb-6">
          <Link
            href={product.main_image}
            target="_blank"
            className="cursor-zoom-in"
          >
            <Image
              src={product.main_image}
              alt={`${product.name[locale]}'s Image`}
              width={150}
              height={150}
            />
          </Link>
        </div>

        {/* Product's Images */}
        <p className="mb-2 text-[1rem] leading-6 font-semibold text-gray-700 dark:text-gray-200">
          Images
        </p>
        <div className="mb-6 flex flex-wrap gap-4">
          {product.images.map((url, i) => (
            <Link key={i} href={url} target="_blank" className="cursor-zoom-in">
              <Image src={url} alt="" width={70} height={70} />
            </Link>
          ))}
        </div>

        {/* Product's Description */}
        <p className="mb-2 text-[1rem] leading-6 font-semibold text-gray-700 dark:text-gray-200">
          Description
        </p>
        <p className="mb-6 text-[1rem] leading-6 text-gray-500 dark:text-gray-400">
          {product.description[locale]}
        </p>

        {/* Product's Slug */}
        <p className="mb-2 text-[1rem] leading-6 font-semibold text-gray-700 dark:text-gray-200">
          Slug
        </p>
        <p className="mb-6 text-[1rem] leading-6 text-gray-500 dark:text-gray-400">
          {product.slug}
        </p>

        {/* Product's Categories */}
        <p className="mb-2 text-[1rem] leading-6 font-semibold text-gray-700 dark:text-gray-200">
          Categories
        </p>
        <div className="mb-6 flex gap-2 flex-wrap">
          {product.product_categories.map((e) => (
            <Badge key={e.id}>{e.name}</Badge>
          ))}
        </div>

        {/* Product's Price */}
        <p className="mb-2 text-[1rem] leading-6 font-semibold text-gray-700 dark:text-gray-200">
          Price
        </p>
        <p className="mb-6 text-[1rem] leading-6 text-gray-500 dark:text-gray-400">
          ${product.price}
        </p>

        {/* Product's Stock */}
        <p className="mb-2 text-[1rem] leading-6 font-semibold text-gray-700 dark:text-gray-200">
          Stock
        </p>
        <p
          className={`mb-6 text-[1rem] leading-6 text-gray-500 dark:text-gray-400 font-semibold ${product.stock > 10 ? "text-success-600 dark:text-success-500" : product.stock > 5 ? "text-warning-500" : "text-error-500 dark:text-error-600"}`}
        >
          {product.stock}
        </p>

        {/* Product's Created_at */}
        <p className="mb-2 text-[1rem] leading-6 font-semibold text-gray-700 dark:text-gray-200">
          Created at
        </p>
        <p className="mb-6 text-[1rem] leading-6 text-gray-500 dark:text-gray-400">
          {formattedDate}
        </p>
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-8">
        <Button
          variant={"outline"}
          onClick={closeModal}
          className="dark:border-gray-700 dark:text-white/90"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}

export default ProductViewModal;

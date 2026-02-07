import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import ActionsButton from "./ActionsButton";
import { ProductType } from "@/types/ProductType";
import { useLocale } from "next-intl";
import Badge from "../../../components/ui/badge/Badge";
import ProductViewModal from "./ProductViewModal";
import { useModal } from "@/hooks/useModal";
import ProductDeleteModal from "./ProductDeleteModal";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import _ from "lodash";

export default function ProductsTable({
  products,
}: {
  products: Array<ProductType>;
}) {
  const [product, setProduct] = useState<ProductType>({} as ProductType);
  const locale = useLocale();
  const {
    isOpen: isViewModalOpen,
    openModal: openViewModal,
    closeModal: closeViewModal,
  } = useModal();
  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  function handleOpenViewModal(product: ProductType) {
    setProduct(product);
    openViewModal();
  }

  function handleOpenDeleteModal(product: ProductType) {
    setProduct(product);
    openDeleteModal();
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          {!_.isEmpty(product) && (
            <>
              <ProductViewModal
                isModalOpen={isViewModalOpen}
                closeModal={closeViewModal}
                product={product}
                locale={locale}
              />
              <ProductDeleteModal
                isModalOpen={isDeleteModalOpen}
                closeModal={closeDeleteModal}
                product={product}
                locale={locale}
              />
            </>
          )}
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  ID
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Image
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Description
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Slug
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Product&apos;s Categories
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Price
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Stock
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Created at
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {products.map((product) => {
                const date = new Date(product.created_at);
                const formattedDate = new Intl.DateTimeFormat("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }).format(date);

                return (
                  <Fragment key={product.id}>
                    <TableRow
                      onClick={() => handleOpenViewModal(product)}
                      className="cursor-pointer hover:bg-gray-50 hover:dark:bg-black"
                    >
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {product.id}
                      </TableCell>
                      <TableCell className="flex justify-center items-center px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {product.main_image ? (
                          <Image
                            src={product.main_image}
                            alt={`${product.name} Image`}
                            width={50}
                            height={50}
                            className="rounded shadow"
                          />
                        ) : (
                          <p className="text-xs">No Image</p>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {product.name[locale]}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 max-w-[25ch] truncate">
                        {product.description[locale]}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {product.slug}
                      </TableCell>
                      <TableCell className="px-4 py-3 space-x-2 space-y-2 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {product.product_categories.map((e) => (
                          <Badge key={e.id}>{e.name}</Badge>
                        ))}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        ${product.price}
                      </TableCell>
                      <TableCell
                        className={`px-4 py-3 font-semibold ${product.stock > 10 ? "text-success-600 dark:text-success-500" : product.stock > 5 ? "text-warning-500" : "text-error-500 dark:text-error-600"} text-start text-theme-sm`}
                      >
                        {product.stock}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {formattedDate}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <ActionsButton
                          product={product}
                          openDeleteModal={() => handleOpenDeleteModal(product)}
                          openViewModal={() => handleOpenViewModal(product)}
                        />
                      </TableCell>
                    </TableRow>
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

"use client";
import _ from "lodash";
import SearchInput from "../../components/common/SearchInput";
import UpdateToastHandler from "../../components/common/UpdateToastHandler";
import Pagination from "../../components/tables/Pagination";
import { useSearchParams } from "next/navigation";
import ProductsTable from "./components/ProductsTable";
import ProductsTableSkeleton from "./components/ProductsTableSkeleton";
import { PlusIcon } from "lucide-react";
import StyledButton from "../../components/common/StyledButton";
import Link from "next/link";
import CreateToastHandler from "../../components/common/CreateToastHandler";
import { QUERY_KEYS } from "@/constants/query-keys";
import { PAGE_SIZE } from "@/constants/page-size";
import RefreshButton from "../../components/common/RefreshButton";
import useProductsQuery from "@/hooks/queries/products/useProductsQuery";

type Params = {
  page?: string;
  q?: string;
};

function ProductsPage() {
  const searchParams = useSearchParams();
  const productsParams: Params = Object.fromEntries(searchParams.entries());

  const { data, isLoading, isFetching, error } = useProductsQuery({params: productsParams, PAGE_SIZE});

  if (error) return <p className="text-red-500">Failed to load products</p>;

  return (
    <div>
      <CreateToastHandler
        message="Product Created successfully!"
        urlToReplace="/dashboard/products"
      />
      <UpdateToastHandler
        message="Product updated successfully!"
        urlToReplace="/dashboard/products"
      />
      <div className="flex flex-wrap flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Products
        </h2>
        <div className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap flex-col-reverse sm:flex-row justify-center items-start sm:items-center gap-4">
          <div className="flex flex-row-reverse sm:flex-row items-center gap-2">
            <RefreshButton QueryKeyToRefresh={QUERY_KEYS.products.all} isFetching={isFetching} isLoading={isLoading}/>
            <SearchInput placeholder="Search products..." />
          </div>
          <Link href={"/dashboard/products/new"}>
            <StyledButton className="flex">
              <PlusIcon />
              Create New Product
            </StyledButton>
          </Link>
        </div>
      </div>
      {_.isEmpty(data?.products) && !isLoading && !productsParams.q && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-16">
          There are no products
        </p>
      )}
      {_.isEmpty(data?.products) && !isLoading && productsParams.q && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-16">
          There is no product{" "}
          {productsParams.q && `matches "${productsParams.q}"`}
        </p>
      )}
      {!_.isEmpty(data?.products) && !isLoading ? (
        <div className="space-y-6">
          <ProductsTable products={data?.products ?? []} />
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {PAGE_SIZE} entries
            </p>
            <Pagination
              currentPage={data?.page as number}
              totalPages={data?.totalPages as number}
            />
          </div>
        </div>
      ) : isLoading ? (
        <ProductsTableSkeleton />
      ) : (
        ""
      )}
    </div>
  );
}

export default ProductsPage;

"use client";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
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
import getProducts from "@/lib/actions/products/getProducts";

const PAGE_SIZE = 10;

type Params = {
  page?: string;
  q?: string;
};

function ProductsPage() {
  const searchParams = useSearchParams();
  const productsParams: Params = Object.fromEntries(
    searchParams.entries(),
  );

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["products", productsParams.page, productsParams.q],
    queryFn: () => getProducts({ ...productsParams, PAGE_SIZE }),
  });

  useEffect(() => {
    if (isFetching) {
      toast("Refreshing...");
    }
  }, [isFetching]);

  if (error) return <p className="text-red-500">Failed to load products</p>;

  return (
    <div>
      <title>SHOPYA | Products</title>
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
          <SearchInput placeholder="Search products..." />
          <Link href={"/dashboard/products/new-product"}>
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
      ) : isLoading ? <ProductsTableSkeleton /> : ""}
    </div>
  );
}

export default ProductsPage;

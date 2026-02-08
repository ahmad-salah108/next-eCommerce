"use client";
import _ from "lodash";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import SearchInput from "../../components/common/SearchInput";
import UpdateToastHandler from "../../components/common/UpdateToastHandler";
import Pagination from "../../components/tables/Pagination";
import { useSearchParams } from "next/navigation";
import CategoriesTable from "./components/CategoriesTable";
import getCategories from "@/lib/actions/categories/getCategories";
import CategoriesTableSkeleton from "./components/CategoriesTableSkeleton";
import { PlusIcon, RefreshCcwIcon } from "lucide-react";
import StyledButton from "../../components/common/StyledButton";
import Link from "next/link";
import CreateToastHandler from "../../components/common/CreateToastHandler";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 10;

type CategoriesParamsType = {
  page?: string;
  q?: string;
};

function CategoriesPage() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const categoriesParams: CategoriesParamsType = Object.fromEntries(
    searchParams.entries(),
  );

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["categories", categoriesParams.page, categoriesParams.q],
    queryFn: () => getCategories({ ...categoriesParams, PAGE_SIZE }),
  });

  function handleRefreshButton() {
    if (!isFetching && !isLoading) {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  }

  if (error) return <p className="text-red-500">Failed to load categories</p>;

  return (
    <div>
      <title>Categories | SHOPYA</title>
      <CreateToastHandler
        message="Category Created successfully!"
        urlToReplace="/dashboard/categories"
      />
      <UpdateToastHandler
        message="Category updated successfully!"
        urlToReplace="/dashboard/categories"
      />
      <div className="flex flex-wrap flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Categories
        </h2>
        <div className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap flex-col-reverse sm:flex-row justify-center items-start sm:items-center gap-4">
          <div className="flex flex-row-reverse sm:flex-row items-center gap-2">
            <Button
              size={"icon-sm"}
              variant={"outline"}
              className="bg-white dark:bg-[#171e2e] dark:border-gray-800 dark:text-white/90"
              disabled={isFetching || isLoading}
              onClick={handleRefreshButton}
            >
              <div
                className={
                  isFetching || isLoading
                    ? "animate-spin-loading"
                    : "animate-spin-stop"
                }
              >
                <RefreshCcwIcon />
              </div>
            </Button>
            <SearchInput placeholder="Search categories..." />
          </div>
          <Link href={"/dashboard/categories/new-category"}>
            <StyledButton className="flex">
              <PlusIcon />
              Create New Category
            </StyledButton>
          </Link>
        </div>
      </div>
      {_.isEmpty(data?.categories) && !isLoading && !categoriesParams.q && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-16">
          There are no categories
        </p>
      )}
      {_.isEmpty(data?.categories) && !isLoading && categoriesParams.q && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-16">
          There is no category{" "}
          {categoriesParams.q && `matches "${categoriesParams.q}"`}
        </p>
      )}
      {!_.isEmpty(data?.categories) && !isLoading ? (
        <div className="space-y-6">
          <CategoriesTable categories={data?.categories ?? []} />
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
        <CategoriesTableSkeleton />
      ) : (
        ""
      )}
    </div>
  );
}

export default CategoriesPage;

"use client";
import _ from "lodash";
import SearchInput from "../../components/common/SearchInput";
import UpdateToastHandler from "../../components/common/UpdateToastHandler";
import Pagination from "../../components/tables/Pagination";
import { useSearchParams } from "next/navigation";
import CategoriesTable from "./components/CategoriesTable";
import CategoriesTableSkeleton from "./components/CategoriesTableSkeleton";
import { PlusIcon } from "lucide-react";
import StyledButton from "../../components/common/StyledButton";
import Link from "next/link";
import CreateToastHandler from "../../components/common/CreateToastHandler";
import { QUERY_KEYS } from "@/constants/query-keys";
import { PAGE_SIZE } from "@/constants/page-size";
import RefreshButton from "../../components/common/RefreshButton";
import { TablePageParams } from "@/types/TablePageParams";
import useCategoriesQuery from "@/hooks/queries/categories/useCategoriesQuery";

function CategoriesPage() {
  const searchParams = useSearchParams();
  const categoriesParams: TablePageParams = Object.fromEntries(
    searchParams.entries(),
  );

  const { data, isLoading, isFetching, error } = useCategoriesQuery({
    params: categoriesParams,
    PAGE_SIZE,
  });

  if (error) return <p className="text-red-500">Failed to load categories</p>;

  return (
    <div>
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
            <RefreshButton
              QueryKeyToRefresh={QUERY_KEYS.categories.all}
              isFetching={isFetching}
              isLoading={isLoading}
            />
            <SearchInput placeholder="Search categories..." />
          </div>
          <Link href={"/dashboard/categories/new"}>
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

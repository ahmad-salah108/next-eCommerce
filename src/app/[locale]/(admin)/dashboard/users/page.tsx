"use client";
import _ from "lodash";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getUsers from "@/lib/actions/users/getUsers";
import { toast } from "sonner";
import { useEffect } from "react";
import SearchInput from "../../components/common/SearchInput";
import UsersTableSkeleton from "./components/UsersTableSkeleton";
import UpdateToastHandler from "../../components/common/UpdateToastHandler";
import UsersTable from "./components/UsersTable";
import Pagination from "../../components/tables/Pagination";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RefreshCcwIcon } from "lucide-react";

const PAGE_SIZE = 10;

type UsersParamsType = {
  page?: string;
  q?: string;
};

function UsersPage() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const usersParams: UsersParamsType = Object.fromEntries(
    searchParams.entries(),
  );

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["users", usersParams.page, usersParams.q],
    queryFn: () => getUsers({ ...usersParams, PAGE_SIZE }),
  });

  function handleRefreshButton() {
    if (!isFetching && !isLoading) {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  }

  if (error) return <p className="text-red-500">Failed to load users</p>;

  return (
    <div>
      <title>Users | SHOPYA</title>
      <UpdateToastHandler
        message="User updated successfully!"
        urlToReplace="/dashboard/users"
      />
      <div className="flex flex-wrap items-center justify-between gap-8 mb-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Users
        </h2>
        <div className="flex flex-row-reverse 2xsm:flex-row items-center gap-2">
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
          <SearchInput placeholder="Search users..." />
        </div>
      </div>
      {_.isEmpty(data?.users) && !isLoading && !usersParams.q && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-16">
          There are no users
        </p>
      )}
      {_.isEmpty(data?.users) && !isLoading && usersParams.q && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-16">
          There is no user {usersParams.q && `matches "${usersParams.q}"`}
        </p>
      )}
      {!_.isEmpty(data?.users) && !isLoading ? (
        <div className="space-y-6">
          <UsersTable users={data?.users ?? []} />
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
        <UsersTableSkeleton />
      ) : (
        ""
      )}
    </div>
  );
}

export default UsersPage;

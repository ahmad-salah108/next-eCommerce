"use client";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import getUsers from "@/lib/actions/users/getUsers";
import { toast } from "sonner";
import { useEffect } from "react";
import SearchInput from "../../components/common/SearchInput";
import UsersTableSkeleton from "./components/UsersTableSkeleton";
import UpdateToastHandler from "../../components/common/UpdateToastHandler";
import UsersTable from "./components/UsersTable";
import Pagination from "../../components/tables/Pagination";
import { useSearchParams } from "next/navigation";

const PAGE_SIZE = 10

type UsersParamsType = {
  page?: string,
  q?: string
};

function UsersPage() {
  const searchParams = useSearchParams();
  const usersParams: UsersParamsType = Object.fromEntries(searchParams.entries());

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["users", usersParams.page, usersParams.q],
    queryFn: () => getUsers({...usersParams, PAGE_SIZE}),

    staleTime: 60 * 1000, // ✅ cache is fresh for 1 minute
    gcTime: 5 * 60 * 1000, // optional (default is 5 min)

    refetchInterval: 60 * 1000, // ⬅️ auto-check DB every 60s
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isFetching) {
      toast("Refreshing...");
    }
  }, [isFetching]);

  if (isLoading)
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-8 mb-6 w-full">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Users
          </h2>
          <SearchInput placeholder="Search users..." />
        </div>
        <UsersTableSkeleton />
      </div>
    );

  // isLoading → only first-ever fetch
  // isFetching → background refresh

  if (error) return <p className="text-red-500">Failed to load users</p>;

  return (
    <div>
      <UpdateToastHandler
        message="User updated successfully!"
        urlToReplace="/dashboard/users"
      />
      <div className="flex flex-wrap items-center justify-between gap-8 mb-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Users
        </h2>
        <SearchInput placeholder="Search users..." />
      </div>
      {_.isEmpty(data?.users) && !usersParams.q && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-16">
          There are no users
        </p>
      )}
      {_.isEmpty(data?.users) && usersParams.q && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-16">
          There is no user {usersParams.q && `matches "${usersParams.q}"`}
        </p>
      )}
      {!_.isEmpty(data?.users) && (
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
      )}
    </div>
  );
}

export default UsersPage;

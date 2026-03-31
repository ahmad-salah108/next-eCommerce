"use client";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import getUsers from "@/lib/actions/users/getUsers";
import SearchInput from "../../components/common/SearchInput";
import UsersTableSkeleton from "./components/UsersTableSkeleton";
import UpdateToastHandler from "../../components/common/UpdateToastHandler";
import UsersTable from "./components/UsersTable";
import Pagination from "../../components/tables/Pagination";
import { useSearchParams } from "next/navigation";
import { QUERY_KEYS } from "@/constants/query-keys";
import { PAGE_SIZE } from "@/constants/page-size";
import RefreshButton from "../../components/common/RefreshButton";

type UsersParamsType = {
  page?: string;
  q?: string;
};

function UsersPage() {
  const searchParams = useSearchParams();
  const usersParams: UsersParamsType = Object.fromEntries(
    searchParams.entries(),
  );

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: QUERY_KEYS.users.list(usersParams.page, usersParams.q),
    queryFn: () => getUsers({ ...usersParams, PAGE_SIZE }),
  });

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
        <div className="flex flex-row-reverse 2xsm:flex-row items-center gap-2">
          <RefreshButton QueryKeyToRefresh={QUERY_KEYS.users.all} isFetching={isFetching} isLoading={isLoading}/>
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

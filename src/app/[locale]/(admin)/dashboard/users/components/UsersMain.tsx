"use client";
import UpdateToastHandler from "../../../components/UpdateToastHandler";
import SearchInput from "../../../components/SearchInput";
import _ from "lodash";
import UsersTable from "./UsersTable";
import Pagination from "../../../components/tables/Pagination";
import { useQuery } from "@tanstack/react-query";
import getUsers from "@/lib/actions/users/getUsers";
import { toast } from "sonner";

type Props = {
  getUsersParams: {
    paramsPage?: string;
    q?: string;
    PAGE_SIZE: number;
  };
};

function UsersMain({ getUsersParams }: Props) {
  const { paramsPage, q, PAGE_SIZE } = getUsersParams;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["users", paramsPage],
    queryFn: () => getUsers(getUsersParams),
    refetchInterval: 60_000, // ⬅️ auto-check DB every 60s
  });

  if (isLoading) return <p>Loading...</p>;

  if (isFetching) toast("Refreshing...");

  if(error) return <p className="text-red-500">Failed to load users</p>;

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
      {_.isEmpty(data?.users) && !q && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-16">
          There are no users
        </p>
      )}
      {_.isEmpty(data?.users) && q && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-16">
          There is no user {q && `matches "${q}"`}
        </p>
      )}
      {!_.isEmpty(data?.users) && (
        <div className="space-y-6">
          <UsersTable users={data?.users ?? []} />
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {PAGE_SIZE} users per page
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

export default UsersMain;

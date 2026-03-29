"use client";
import _ from "lodash";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SearchInput from "../../components/common/SearchInput";
import Pagination from "../../components/tables/Pagination";
import { useSearchParams } from "next/navigation";
import OrdersTable from "./components/OrdersTable";
import OrdersTableSkeleton from "./components/OrdersTableSkeleton";
import { RefreshCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getOrders } from "@/lib/actions/orders/getOrders";

const PAGE_SIZE = 10;

type OrdersParams = {
  page?: string;
  q?: string;
};

function OrdersPage() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const ordersParams: OrdersParams = Object.fromEntries(
    searchParams.entries(),
  );

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: QUERY_KEYS.orders.list(ordersParams.page, ordersParams.q),
    queryFn: () => getOrders({ ...ordersParams, PAGE_SIZE }),
  });

  function handleRefreshButton() {
    if (!isFetching && !isLoading) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.orders.all });
    }
  }

  if (error) return <p className="text-red-500">Failed to load orders</p>;

  return (
    <div>
      <div className="flex flex-wrap flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Orders
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
            <SearchInput placeholder="Search orders..." />
          </div>
        </div>
      </div>
      {_.isEmpty(data?.orders) && !isLoading && !ordersParams.q && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-16">
          There are no orders
        </p>
      )}
      {_.isEmpty(data?.orders) && !isLoading && ordersParams.q && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-16">
          There is no order{" "}
          {ordersParams.q && `matches "${ordersParams.q}"`}
        </p>
      )}
      {!_.isEmpty(data?.orders) && !isLoading ? (
        <div className="space-y-6">
          <OrdersTable orders={data?.orders ?? []} />
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
        <OrdersTableSkeleton />
      ) : (
        ""
      )}
    </div>
  );
}

export default OrdersPage;

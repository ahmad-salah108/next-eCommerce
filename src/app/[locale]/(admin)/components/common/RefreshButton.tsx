"use client"
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcwIcon } from "lucide-react";

type QueryKeysType = typeof QUERY_KEYS

type Props = {
  QueryKeyToRefresh: QueryKeysType[keyof QueryKeysType]["all"];
  isFetching: boolean;
  isLoading: boolean;
}

function RefreshButton({QueryKeyToRefresh, isFetching, isLoading}: Props) {
  const queryClient = useQueryClient();

  function handleRefreshButton() {
    if (!isFetching && !isLoading) {
      queryClient.invalidateQueries({ queryKey: QueryKeyToRefresh });
    }
  }

  return (
    <Button
      variant={"outline"}
      className="w-9 h-9 bg-white dark:bg-white/3 dark:border-white/5 dark:text-white/90"
      disabled={isFetching || isLoading}
      onClick={handleRefreshButton}
    >
      <div
        className={
          isFetching || isLoading ? "animate-spin-loading" : "animate-spin-stop"
        }
      >
        <RefreshCcwIcon />
      </div>
    </Button>
  );
}

export default RefreshButton;

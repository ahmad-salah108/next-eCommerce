import { Button } from "@/components/ui/button";
import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  // url: string;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
}) => {
  const pagesAroundCurrent = Array.from(
    { length: Math.min(3, totalPages) },
    (_, i) => i + Math.max(currentPage - 1, 1)
  );

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="flex items-center ">
      {isPreviousDisabled ? (
        <Button
          disabled
          className="mr-2.5 flex items-center h-9 justify-center rounded-lg border border-gray-300 bg-white w-19 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
        >
          Previous
        </Button>
      ) : (
        <Button
          className="mr-2.5 flex items-center h-9 justify-center rounded-lg border border-gray-300 bg-white w-19 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
          asChild
        >
          <Link href={`?page=${currentPage - 1}`}>Previous</Link>
        </Button>
      )}
      <div className="flex items-center gap-2">
        {currentPage > 3 && <span className="px-2">...</span>}
        {pagesAroundCurrent.map((page) => (
          <Button
            key={page}
            className={`rounded ${
              currentPage === page
                ? "bg-black hover:bg-black text-white dark:bg-cyan-900"
                : "text-black hover:bg-black/5 dark:text-cyan-600 dark:hover:bg-cyan-500/5"
            } flex w-9 items-center justify-center h-9 rounded-lg text-sm font-medium`}
            asChild
          >
            <Link href={`?page=${page}`}>{page}</Link>
          </Button>
        ))}
        {currentPage < totalPages - 2 && <span className="px-2">...</span>}
      </div>
      {isNextDisabled ? (
        <Button
          disabled
          className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white w-15 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-9 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
        >
          Next
        </Button>
      ) : (
        <Button
          className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white w-15 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-9 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          asChild
        >
          <Link href={`?page=${currentPage + 1}`}>Next</Link>
        </Button>
      )}
    </div>
  );
};

export default Pagination;

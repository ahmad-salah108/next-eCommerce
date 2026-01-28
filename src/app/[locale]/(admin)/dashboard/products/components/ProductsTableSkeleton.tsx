"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

export default function ProductsTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {[
                  "ID",
                  "Images",
                  "Name",
                  "Description",
                  "Slug",
                  "Product's Categories",
                  "Price",
                  "Stock",
                  "Created at",
                  "Actions",
                ].map((header, index) => (
                  <TableCell
                    key={index}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Skeleton Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="px-4 py-3">
                    <div className="h-4 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="h-4 w-30 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="h-5 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="h-4 w-10 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

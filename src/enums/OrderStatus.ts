export enum OrderStatus {
  pending = "pending",
  paid = "paid",
  processing = "processing",
  shipped = "shipped",
  delivered = "delivered",
  cancelled = "cancelled",
  refunded = "refunded",
}

export const OrderStatusMeta: Record<
  OrderStatus,
  { label: string; color: string }
> = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  },
  paid: {
    label: "Paid",
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  processing: {
    label: "Processing",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  },
  shipped: {
    label: "Shipped",
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  },
  refunded: {
    label: "Refunded",
    color: "bg-gray-200 text-gray-800 dark:bg-[#000]/30 dark:text-gray-300",
  },
};

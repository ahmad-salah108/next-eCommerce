export enum PaymentStatus {
  pending = "pending",
  paid = "paid",
  failed = "failed",
  refunded = "refunded"
}

export const PaymentStatusMeta: Record<PaymentStatus, {label: string, color: string}> = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300"
  },
  paid: {
    label: "Paid",
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  failed: {
    label: "Failed",
    color: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  },
  refunded: {
    label: "Refunded",
    color: "bg-gray-200 text-gray-800 dark:bg-[#000]/30 dark:text-gray-300",
  },
}
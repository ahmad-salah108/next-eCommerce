type BadgeProps = {
  label: string;
  color?: string;
};

const colorDefault = "bg-gray-100 text-gray-800 dark:bg-white/[0.12] dark:text-white";

export function Badge({ label, color = colorDefault }: BadgeProps) {

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}
    >
      {label}
    </span>
  );
}
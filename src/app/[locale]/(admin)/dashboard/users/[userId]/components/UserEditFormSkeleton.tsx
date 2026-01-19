import ComponentCard from "@/app/[locale]/(admin)/components/common/ComponentCard";
import Label from "@/app/[locale]/(admin)/components/form/Label";

export default function UserEditFormSkeleton() {
  return (
    <ComponentCard title="">
      <div className="space-y-6">
        <div className="max-w-[500px]">
          <Label>Full Name</Label>
          <div className="h-11 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="max-w-[500px]">
          <Label>Email</Label>
          <div className="h-11 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="max-w-[500px]">
          <Label>Role</Label>
          <div className="h-11 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="flex justify-end">
            <div className="h-11 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </ComponentCard>
  );
}

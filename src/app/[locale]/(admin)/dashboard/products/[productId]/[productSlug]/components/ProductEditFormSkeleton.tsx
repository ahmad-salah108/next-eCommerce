import ComponentCard from "@/app/[locale]/(admin)/components/common/ComponentCard";
import Label from "@/app/[locale]/(admin)/components/form/Label";

function SkeletonLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-9 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700 ${className}`}
    />
  );
}

function SkeletonTextArea({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-24 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700 ${className}`}
    />
  );
}

export default function ProductEditFormSkeleton() {
  return (
    <ComponentCard title="">
      <div className="space-y-6">
        {/* ---------------- MAIN IMAGE ---------------- */}
        <div className="max-w-[500px] space-y-3">
          <Label>Main Image</Label>
          <SkeletonLine className="h-11 flex-1" />
        </div>

        {/* ---------------- IMAGES ---------------- */}
        <div className="space-y-3">
          <Label>Images</Label>

          <div className="max-w-[500px]">
            <SkeletonLine className="h-11" />
          </div>
        </div>

        {/* ---------------- NAME ---------------- */}
        <div className="max-w-[500px] space-y-3">
          <div>
            <Label>Name in English</Label>
            <SkeletonLine />
          </div>
          <div>
            <Label>Name in Arabic</Label>
            <SkeletonLine />
          </div>
        </div>

        {/* ---------------- DESCRIPTION ---------------- */}
        <div className="max-w-[500px] space-y-3">
          <div>
            <Label>Description in English</Label>
            <SkeletonTextArea />
          </div>
          <div>
            <Label>Description in Arabic</Label>
            <SkeletonTextArea />
          </div>
        </div>

        {/* ---------------- PRICE / STOCK ---------------- */}
        <div className="max-w-[500px] space-y-3">
          <div>
            <Label>Price</Label>
            <SkeletonLine />
          </div>
          <div>
            <Label>Stock</Label>
            <SkeletonLine />
          </div>
        </div>

        {/* ---------------- CATEGORIES ---------------- */}
        <div className="max-w-[500px] space-y-2">
          <Label>Categories</Label>
          <SkeletonLine className="h-11" />
        </div>

        {/* ---------------- SUBMIT ---------------- */}
        <div className="flex justify-end">
          <div className="h-9 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </ComponentCard>
  );
}

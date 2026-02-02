"use client";
import ComponentCard from "@/app/[locale]/(admin)/components/common/ComponentCard";
import Label from "@/app/[locale]/(admin)/components/form/Label";
import Input from "@/app/[locale]/(admin)/components/form/input/InputField";
import StyledButton from "@/app/[locale]/(admin)/components/common/StyledButton";
import { updateCategory } from "@/lib/actions/categories/updateCategory";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { ProductType } from "@/types/ProductType";
import { useLocale } from "next-intl";

type Props = {
  product: ProductType | null;
};

export default function ProductEditForm({ product }: Props) {
  const locale = useLocale()
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (formData: FormData) => updateCategory(formData),
    onSuccess: () => {
      // 🔄 refresh list + single user cache
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", product?.id] });

      router.push("/dashboard/products?updated=true");
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!isPending && !isSuccess) mutate(formData);
  }

  // View selected image
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Create a temporary URL for the selected file
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Clean up memory when the component unmounts or file changes
      return () => URL.revokeObjectURL(url);
    }else{
      setPreviewUrl(null)
    }
  };

  return (
    <ComponentCard title="">
      <form onSubmit={onSubmit}>
        <input type="hidden" name="id" value={product?.id} />
        <input type="hidden" name="oldImageUrl" value={product?.main_image ?? ""} />
        <div className="space-y-6">
          <div className="max-w-[500px] space-y-3">
            <Label>Image</Label>
            {(previewUrl || product?.main_image) && <Image src={previewUrl || product?.main_image || ""} alt={`${product?.name[locale]} Image`} width={70} height={70}/>}
            <Input name="image" type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <div className="max-w-[500px]">
            <Label>Product Name</Label>
            <Input
              name="name"
              type="text"
              required
              defaultValue={product?.name.en}
            />
          </div>
          {isError && <p className="text-red-500 text-sm">{error.message}</p>}
          <StyledButton
            type="submit"
            className="ms-auto px-6"
            disabled={isPending || isSuccess}
          >
            {isPending
              ? "Saving..."
              : isSuccess
                ? "Navigating..."
                : "Save Changes"}
          </StyledButton>
        </div>
      </form>
    </ComponentCard>
  );
}

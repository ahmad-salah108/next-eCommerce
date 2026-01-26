"use client";
import ComponentCard from "@/app/[locale]/(admin)/components/common/ComponentCard";
import Label from "@/app/[locale]/(admin)/components/form/Label";
import Input from "@/app/[locale]/(admin)/components/form/input/InputField";
import StyledButton from "@/app/[locale]/(admin)/components/common/StyledButton";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { createCategory } from "@/lib/actions/categories/createCategory";

export default function CategoryCreateForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (formData: FormData) => createCategory(formData),
    onSuccess: () => {
      // 🔄 refresh list + single user cache
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      router.push("/dashboard/categories?created=true");
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
        <div className="space-y-6">
          <div className="max-w-[500px] space-y-3">
            <Label>Image</Label>
            {previewUrl && <Image src={previewUrl || ""} alt={`Category Image`} width={70} height={70}/>}
            <Input name="image" type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <div className="max-w-[500px]">
            <Label>Category Name</Label>
            <Input
              name="name"
              type="text"
              required
            />
          </div>
          {isError && <p className="text-red-500 text-sm">{error.message}</p>}
          <StyledButton
            type="submit"
            className="ms-auto px-6"
            disabled={isPending || isSuccess}
          >
            {isPending
              ? "Creating..."
              : isSuccess
                ? "Navigating..."
                : "Create"}
          </StyledButton>
        </div>
      </form>
    </ComponentCard>
  );
}

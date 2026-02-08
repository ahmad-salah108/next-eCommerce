"use client";

import ComponentCard from "@/app/[locale]/(admin)/components/common/ComponentCard";
import Label from "@/app/[locale]/(admin)/components/form/Label";
import Input from "@/app/[locale]/(admin)/components/form/input/InputField";
import StyledButton from "@/app/[locale]/(admin)/components/common/StyledButton";
import TextArea from "@/app/[locale]/(admin)/components/form/input/TextArea";
import FileInput from "@/app/[locale]/(admin)/components/form/input/FileInput";
import MultiSelect from "@/app/[locale]/(admin)/components/form/input/MultiSelect";

import { createProduct } from "@/lib/actions/products/createProduct";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, useMemo, useState } from "react";
import getCategories from "@/lib/actions/categories/getCategories";

export default function ProductCreateForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (formData: FormData) => createProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/dashboard/products?created=true");
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.delete("category_ids");
    formData.append("category_ids", JSON.stringify(selectedCategories));
    if (!isPending && !isSuccess) mutate(formData);
  }

  /* -------------------- MAIN IMAGE -------------------- */
  const [previewMainImage, setPreviewMainImage] = useState<string | null>(null);

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewMainImage(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewMainImage(null);
    }
  };

  /* -------------------- IMAGES -------------------- */
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  /* -------------------- CATEGORIES -------------------- */
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const { data: { categories } = {} } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories({ getAll: true }),
  });

  const multiOptions = useMemo(() => {
    return categories?.map((c) => ({
      value: `${c.id}`,
      text: c.name,
      selected: false,
    }));
  }, [categories]);

  return (
    <ComponentCard title="">
      <form onSubmit={onSubmit}>
        <div className="space-y-6">
          {/* ---------------- MAIN IMAGE ---------------- */}
          <div className="max-w-[500px] space-y-3">
            <Label>Main Image</Label>
            {previewMainImage && (
              <Image
                src={previewMainImage}
                alt="Main image preview"
                width={70}
                height={70}
                className="rounded shadow w-[70px] h-[70px] object-cover"
              />
            )}
            <FileInput
              name="main_image"
              accept="image/*"
              onChange={handleMainImageChange}
              required
            />
          </div>

          {/* ---------------- IMAGES ---------------- */}
          <div className="space-y-3">
            <Label>Images</Label>
            <div className="max-w-[500px]">
              <FileInput
                name="images"
                multiple
                accept="image/*"
                onChange={handleImagesChange}
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              {previewImages.map((img) => (
                <Image
                  key={img}
                  src={img}
                  alt="New image preview"
                  width={70}
                  height={70}
                  className="rounded opacity-70"
                />
              ))}
            </div>
          </div>

          {/* ---------------- NAME ---------------- */}
          <div className="max-w-[500px] space-y-3">
            <div>
              <Label>Name in English</Label>
              <Input name="name_en" type="text" required />
            </div>
            <div>
              <Label>Name in Arabic</Label>
              <Input name="name_ar" type="text" />
            </div>
          </div>

          {/* ---------------- DESCRIPTION ---------------- */}
          <div className="max-w-[500px] space-y-3">
            <div>
              <Label>Description in English</Label>
              <TextArea name="description_en" rows={6} required />
            </div>
            <div>
              <Label>Description in Arabic</Label>
              <TextArea name="description_ar" rows={6} />
            </div>
          </div>

          {/* ---------------- PRICE / STOCK ---------------- */}
          <div className="max-w-[500px] space-y-3">
            <div>
              <Label>Price</Label>
              <Input name="price" type="number" min="0" step={1} required />
            </div>
            <div>
              <Label>Stock</Label>
              <Input name="stock" type="number" min="0" step={1} required />
            </div>
          </div>

          {/* ---------------- CATEGORIES ---------------- */}
          <div className="max-w-[500px] space-y-2">
            <MultiSelect
              key={categories?.[0]?.id}
              label="Categories"
              name="category_ids"
              options={multiOptions}
              defaultSelected={selectedCategories.map(String)}
              onChange={(values) => setSelectedCategories(values.map(Number))}
              required
            />
          </div>

          {/* ---------------- ERRORS ---------------- */}
          {isError && <p className="text-red-500 text-sm">{error.message}</p>}

          {/* ---------------- SUBMIT ---------------- */}
          <StyledButton
            type="submit"
            className="ms-auto px-6"
            disabled={isPending || isSuccess || !selectedCategories.length}
          >
            {isPending
              ? "Creating..."
              : isSuccess
                ? "Navigating..."
                : "Create Product"}
          </StyledButton>
        </div>
      </form>
    </ComponentCard>
  );
}

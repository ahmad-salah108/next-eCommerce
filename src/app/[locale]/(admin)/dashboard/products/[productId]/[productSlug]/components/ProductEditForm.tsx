"use client";

import ComponentCard from "@/app/[locale]/(admin)/components/common/ComponentCard";
import Label from "@/app/[locale]/(admin)/components/form/Label";
import Input from "@/app/[locale]/(admin)/components/form/input/InputField";
import StyledButton from "@/app/[locale]/(admin)/components/common/StyledButton";

import { updateProduct } from "@/lib/actions/products/updateProduct";
import { ProductType } from "@/types/ProductType";

import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import getCategories from "@/lib/actions/categories/getCategories";
import TextArea from "@/app/[locale]/(admin)/components/form/input/TextArea";
import FileInput from "@/app/[locale]/(admin)/components/form/input/FileInput";
import MultiSelect from "@/app/[locale]/(admin)/components/form/input/MultiSelect";
import _ from "lodash";

type Props = {
  product: ProductType | null;
  categoryIds: number[]; // categories already assigned to product
};

export default function ProductEditForm({ product, categoryIds }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (formData: FormData) => updateProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["products", product?.id],
      });

      router.push("/dashboard/products?updated=true");
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // pass old images + categories
    formData.append("old_images", JSON.stringify(product?.images));
    formData.append("kept_images", JSON.stringify(images));
    formData.append("category_ids", JSON.stringify(selectedCategories));

    if (!isPending && !isSuccess) mutate(formData);
  }

  /* -------------------- MAIN IMAGE -------------------- */
  const [previewMainImage, setPreviewMainImage] = useState<string | null>(null);

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Create a temporary URL for the selected file
      const url = URL.createObjectURL(file);
      setPreviewMainImage(url);

      // Clean up memory when the component unmounts or file changes
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewMainImage(null);
    }
  };

  /* -------------------- IMAGES -------------------- */
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const removeOldImage = (url: string) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  /* -------------------- CATEGORIES -------------------- */

  const [selectedCategories, setSelectedCategories] =
    useState<number[]>(categoryIds);

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
  /* -------------------- RENDER -------------------- */

  return (
    <ComponentCard title="">
      <form onSubmit={onSubmit}>
        <input type="hidden" name="id" value={product?.id} />

        <div className="space-y-6">
          {/* ---------------- MAIN IMAGE ---------------- */}
          <div className="max-w-[500px] space-y-3">
            <input
              type="hidden"
              name="oldImageUrl"
              value={product?.main_image ?? ""}
            />

            <Label>Main Image</Label>

            <FileInput
              name="main_image"
              accept="image/*"
              onChange={handleMainImageChange}
            />

            {(previewMainImage || product?.main_image) && (
              <Image
                src={previewMainImage || product?.main_image || ""}
                alt={`${product?.name["en"]} Image`}
                width={70}
                height={70}
                className="rounded shadow w-[70px] h-[70px] object-cover"
              />
            )}
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
              {images.map((img) => (
                <div key={img} className="relative">
                  <Image
                    src={img}
                    alt={`${product?.name?.en} image`}
                    width={70}
                    height={70}
                    className="rounded shadow w-[70px] h-[70px] object-cover"
                    loading="eager"
                  />
                  <button
                    type="button"
                    onClick={() => removeOldImage(img)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5"
                  >
                    ×
                  </button>
                </div>
              ))}

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
              <Input
                name="name_en"
                type="text"
                required
                defaultValue={product?.name.en}
              />
            </div>

            <div>
              <Label>Name in Arabic</Label>
              <Input
                name="name_ar"
                type="text"
                defaultValue={product?.name.ar}
              />
            </div>
          </div>

          {/* ---------------- DESCRIPTION ---------------- */}
          <div className="max-w-[500px] space-y-3">
            <div>
              <Label>Description in English</Label>
              <TextArea
                name="description_en"
                defaultValue={product?.description.en}
                rows={6}
                required
              />
            </div>

            <div>
              <Label>Description in Arabic</Label>
              <TextArea
                name="description_ar"
                defaultValue={product?.description.ar}
                rows={6}
              />
            </div>
          </div>

          {/* ---------------- PRICE / STOCK ---------------- */}
          <div className="max-w-[500px] space-y-3">
            <div>
              <Label>Price</Label>
              <Input
                name="price"
                type="number"
                min="0"
                step={1}
                required
                defaultValue={product?.price}
              />
            </div>

            <div>
              <Label>Stock</Label>
              <Input
                name="stock"
                type="number"
                min="0"
                step={1}
                required
                defaultValue={product?.stock}
              />
            </div>
          </div>

          {/* ---------------- CATEGORIES ---------------- */}
          <input
            key={categoryIds?.[0]}
            type="hidden"
            name="old_category_ids"
            defaultValue={JSON.stringify(categoryIds)}
          />
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

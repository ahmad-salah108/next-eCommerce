"use client";
import { useActionState } from "react";
import ComponentCard from "@/app/[locale]/(admin)/components/common/ComponentCard";
import Label from "@/app/[locale]/(admin)/components/form/Label";
import Input from "@/app/[locale]/(admin)/components/form/input/InputField";
import StyledButton from "@/app/[locale]/(admin)/components/StyledButton";
import { toast } from "sonner";
import { useEffect } from "react";
import { CategoryType } from "@/types/CategoryType";
import { updateCategory } from "@/lib/actions/categories/updateCategory";

type Props = {
  category: CategoryType | null;
};

const initialState = { error: null };

export default function CategoryEditForm({ category }: Props) {
  const [state, formAction, isPending] = useActionState(
    updateCategory,
    initialState
  );

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);

  return (
    <ComponentCard title="">
      <form action={formAction}>
        <input type="hidden" name="id" value={category?.id} />
        <input type="hidden" name="oldImageUrl" value={category?.image ?? ""} />
        <div className="space-y-6">
          <div className="max-w-[500px]">
            <Label>Image</Label>
            <Input name="image" type="file" accept="image/*" />
          </div>
          <div className="max-w-[500px]">
            <Label>Category Name</Label>
            <Input name="name" type="text" required defaultValue={category?.name} />
          </div>
          {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
          <StyledButton
            type="submit"
            className="ms-auto px-6"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </StyledButton>
        </div>
      </form>
    </ComponentCard>
  );
}

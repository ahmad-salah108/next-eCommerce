"use client";
import { useActionState } from "react";
import { UserType } from "@/types/UserType";
import ComponentCard from "@/app/[locale]/(admin)/components/common/ComponentCard";
import Label from "@/app/[locale]/(admin)/components/form/Label";
import Input from "@/app/[locale]/(admin)/components/form/input/InputField";
import Select from "@/app/[locale]/(admin)/components/form/Select";
import StyledButton from "@/app/[locale]/(admin)/components/common/StyledButton";
import { toast } from "sonner";
import { useEffect } from "react";
import { updateUser } from "@/lib/actions/users/updateUser";

type Props = {
  user: UserType | null;
};

const ROLES_OPTIONS = [
  { label: "Customer", value: "customer" },
  { label: "Admin", value: "admin" },
];

const initialState = { error: null };

export default function UserEditForm({ user }: Props) {
  const [state, formAction, isPending] = useActionState(
    updateUser,
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
        <input type="hidden" name="user_id" value={user?.user_id} />
        <div className="space-y-6">
          <div className="max-w-[500px]">
            <Label>Full Name</Label>
            <Input
              name="full_name"
              type="text"
              defaultValue={user?.full_name}
              required
            />
          </div>
          <div className="max-w-[500px]">
            <Label>Email</Label>
            <Input name="email" type="email" defaultValue={user?.email} required/>
          </div>
          <div className="max-w-[500px]">
            <Label>Role</Label>
            <Select
              name="role"
              options={ROLES_OPTIONS}
              defaultValue={user?.role}
            />
          </div>
          {state.error && (
            <p className="text-red-500 text-sm">{state.error}</p>
          )}
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

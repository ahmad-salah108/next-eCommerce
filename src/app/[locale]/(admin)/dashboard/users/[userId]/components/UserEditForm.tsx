"use client";
import { UserType } from "@/types/UserType";
import ComponentCard from "@/app/[locale]/(admin)/components/common/ComponentCard";
import Label from "@/app/[locale]/(admin)/components/form/Label";
import Input from "@/app/[locale]/(admin)/components/form/input/InputField";
import Select from "@/app/[locale]/(admin)/components/form/Select";
import StyledButton from "@/app/[locale]/(admin)/components/common/StyledButton";
import { updateUser } from "@/lib/actions/users/updateUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
  user: UserType | null | undefined;
};

const ROLES_OPTIONS = [
  { label: "Customer", value: "customer" },
  { label: "Admin", value: "admin" },
];

export default function UserEditForm({ user }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (formData: FormData) => updateUser(formData),
    onSuccess: () => {
      // 🔄 refresh list + single user cache
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", user?.id] });

      router.push("/dashboard/users?updated=true")
    }
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if(!isPending && !isSuccess) mutate(formData);
  }

  return (
    <ComponentCard title="">
      <form onSubmit={onSubmit}>
        <input type="hidden" name="user_id" defaultValue={user?.user_id} />
        <div className="space-y-6">
          <div className="max-w-[500px]">
            <Label>Full Name</Label>
            <Input
              key={user?.full_name}
              name="full_name"
              type="text"
              defaultValue={user?.full_name}
              required
            />
          </div>
          <div className="max-w-[500px]">
            <Label>Email</Label>
            <Input
              key={user?.email}
              name="email"
              type="email"
              defaultValue={user?.email}
              required
            />
          </div>
          <div className="max-w-[500px]">
            <Label>Role</Label>
            <Select
              key={user?.role}
              name="role"
              options={ROLES_OPTIONS}
              defaultValue={user?.role}
            />
          </div>
          {isError && <p className="text-red-500 text-sm">{error.message}</p>}
          <StyledButton
            type="submit"
            className="ms-auto px-6"
            disabled={isPending || isSuccess}
          >
            {isPending ? "Saving..." : isSuccess ? "Navigating..." : "Save Changes"}
          </StyledButton>
        </div>
      </form>
    </ComponentCard>
  );
}

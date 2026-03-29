"use client";
import { getUserById } from "@/lib/actions/users/getUserById";
import BackButton from "../../../../components/common/BackButton";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import UserEditFormSkeleton from "./components/UserEditFormSkeleton";
import UserEditForm from "./components/UserEditForm";
import { QUERY_KEYS } from "@/constants/query-keys";

type Props = {
  userId: string;
};

function UserEditPage({ userId }: Props) {
  const { data, isPending, error } = useQuery({
    queryKey: QUERY_KEYS.users.details(userId),
    queryFn: () => getUserById(userId),
  });

  if (error) notFound();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-8 mb-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Edit User
        </h2>
        <BackButton />
      </div>
      {isPending ? <UserEditFormSkeleton /> : <UserEditForm user={data} />}
    </div>
  );
}

export default UserEditPage;

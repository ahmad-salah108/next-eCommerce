"use client";
import { getUserById } from "@/lib/actions/users/getUserById";
import UserEditForm from "./components/UserEditForm";
import BackButton from "../../../components/common/BackButton";
import { notFound } from "next/navigation";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";

import UserEditFormSkeleton from "./components/UserEditFormSkeleton";

type Props = {
  params: Promise<{ userId: string }>;
};

function UserIdPage({ params }: Props) {
  const { userId } = use(params);
  const { data, isPending, error } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(userId),
  });

  if (error) notFound();

  return (
    <div>
      <title>User | SHOPYA</title>
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

export default UserIdPage;

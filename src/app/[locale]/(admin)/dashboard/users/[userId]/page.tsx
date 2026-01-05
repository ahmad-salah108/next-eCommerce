import { getUserById } from "@/lib/getUserById";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EditUserForm from "./components/EditUserForm";
import BackButton from "../../../components/BackButton";

type Props = {
  params: Promise<{ userId: string }>;
};

async function UserIdPage({ params }: Props) {
  const { userId } = await params;
  const user = await getUserById(userId);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-8 mb-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Edit User
        </h2>
        <BackButton />
      </div>
      <EditUserForm user={user} />
    </div>
  );
}

export default UserIdPage;

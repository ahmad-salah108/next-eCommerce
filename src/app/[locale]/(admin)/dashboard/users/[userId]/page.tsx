import { getUserById } from "@/lib/actions/users/getUserById";
import UserEditForm from "./components/UserEditForm";
import BackButton from "../../../components/BackButton";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ userId: string }>;
};

async function UserIdPage({ params }: Props) {
  const { userId } = await params;
  const {profile, error} = await getUserById(userId);

  if(error) notFound()

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-8 mb-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Edit User
        </h2>
        <BackButton />
      </div>
      <UserEditForm user={profile} />
    </div>
  );
}

export default UserIdPage;

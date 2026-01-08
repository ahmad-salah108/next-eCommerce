import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import getUsers from "@/lib/actions/users/getUsers";
import UsersMain from "./components/UsersMain";

export const metadata: Metadata = {
  title: "Users",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

const PAGE_SIZE = 10;

type Props = {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
};

export default async function UsersPage({ searchParams }: Props) {
  const { page: paramsPage = "", q = "" } = await searchParams;
  const getUsersParams = { paramsPage, q, PAGE_SIZE };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users", paramsPage],
    queryFn: () => getUsers(getUsersParams),
  });

  // if (profilesError) {
  //   console.error(profilesError);
  //   return <p className="text-red-500">Failed to load users</p>;
  // }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersMain getUsersParams={getUsersParams}/>
    </HydrationBoundary>
  );
}

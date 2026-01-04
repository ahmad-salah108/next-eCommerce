"use client";
import { useState } from "react";
import { Dropdown } from "../../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../../components/ui/dropdown/DropdownItem";
import { MoreVerticalIcon, UserPenIcon, UserRoundXIcon } from "lucide-react";
import { Modal } from "../../../components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { useMutation } from "@tanstack/react-query";
import { UserType } from "@/types/UserType";
import { Button } from "@/components/ui/button";
import { deleteUserById } from "@/lib/deleteUserById";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

function ActionsButton({ user }: { user: UserType }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteUserById,
    onSuccess: () => {
      toast.success("User has been deleted");
      closeModal();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function handleUserDelete() {
    mutate(user.user_id as string);
  }

  return (
    <div>
      <Button
        onClick={toggleDropdown}
        variant={"ghost"}
        size={"icon"}
        className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <MoreVerticalIcon />
      </Button>
      <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
        <Link href={`/dashboard/users/${user.id}`}>
          <DropdownItem
            tag="a"
            onItemClick={closeDropdown}
            className="flex justify-start items-center gap-2 w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <UserPenIcon className="w-4 h-4" /> Edit
          </DropdownItem>
        </Link>
        {user?.role !== "admin" && <DropdownItem
          tag="a"
          onItemClick={openModal}
          className="flex justify-start items-center gap-2 w-full font-normal text-left text-red-500 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
        >
          <UserRoundXIcon className="w-4 h-4" /> Delete
        </DropdownItem>}
      </Dropdown>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="max-w-[600px] p-5 lg:p-10"
      >
        <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">
          Delete User
        </h4>
        <p className="text-[1rem] leading-6 text-gray-500 dark:text-gray-400">
          Are you sure you want to <strong>DELETE</strong> this user?
        </p>
        <div className="flex items-center justify-end w-full gap-3 mt-8">
          <Button
            variant={"outline"}
            onClick={closeModal}
            className="dark:border-gray-700"
          >
            No
          </Button>
          <Button
            onClick={handleUserDelete}
            className="bg-red-500 text-white w-20 flex justify-center items-center"
            disabled={isPending}
          >
            {isPending && <Spinner />}
            Yes
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ActionsButton;

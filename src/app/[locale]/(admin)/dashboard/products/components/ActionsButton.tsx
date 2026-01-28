"use client";
import { useState, useRef } from "react";
import { Dropdown } from "../../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../../components/ui/dropdown/DropdownItem";
import { MoreVerticalIcon, PenBoxIcon, Trash2 } from "lucide-react";
import { Modal } from "../../../components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { ProductType } from "@/types/ProductType";
import { deleteProductById } from "@/lib/actions/products/deleteProductById";
import { useLocale } from "next-intl";

function ActionsButton({ product }: { product: ProductType }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();
  const queryClient = useQueryClient();
  const locale = useLocale() as "en" | "ar"
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: deleteProductById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product has been deleted");
      closeModal();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function toggleDropdown() {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    // Dispatch event to close other dropdowns when opening this one
    if (newIsOpen && buttonRef.current) {
      const event = new CustomEvent("dropdown-opened", {
        detail: buttonRef.current,
      });
      document.dispatchEvent(event);
    }
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function handleProductDelete() {
    if (!isPending && !isSuccess) mutate(product.id);
  }

  return (
    <div>
      <Button
        ref={buttonRef}
        onClick={toggleDropdown}
        variant={"ghost"}
        size={"icon"}
        className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 dropdown-toggle"
      >
        <MoreVerticalIcon />
      </Button>
      <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
        <Link href={`/dashboard/products/${product.id}/${product.slug}`}>
          <DropdownItem
            tag="a"
            onItemClick={closeDropdown}
            className="flex justify-start items-center gap-2 w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <PenBoxIcon className="w-4 h-4" /> Edit
          </DropdownItem>
        </Link>

        <DropdownItem
          tag="a"
          onItemClick={openModal}
          className="flex justify-start items-center gap-2 w-full font-normal text-left text-red-500 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </DropdownItem>
      </Dropdown>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="max-w-[600px] p-5 lg:p-10"
      >
        <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">
          Delete Product
        </h4>
        <p className="text-[1rem] leading-6 text-gray-500 dark:text-gray-400">
          Are you sure you want to delete <strong>&quot;{product.name[locale]}
          &quot;</strong> product?
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
            onClick={handleProductDelete}
            className="bg-red-500 text-white w-20 flex justify-center items-center"
            disabled={isPending || isSuccess}
          >
            {(isPending || isSuccess) && <Spinner />}
            Yes
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ActionsButton;

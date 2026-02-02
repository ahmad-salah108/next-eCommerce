"use client";
import { useState, useRef } from "react";
import { Dropdown } from "../../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../../components/ui/dropdown/DropdownItem";
import { MoreVerticalIcon, PenBoxIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CategoryType } from "@/types/CategoryType";

function ActionsButton({
  category,
  openDeleteModal,
}: {
  category: CategoryType;
  openDeleteModal: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
        <Link href={`/dashboard/categories/${category.id}/${category.slug}`}>
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
          onItemClick={openDeleteModal}
          className="flex justify-start items-center gap-2 w-full font-normal text-left text-red-500 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </DropdownItem>
      </Dropdown>
    </div>
  );
}

export default ActionsButton;

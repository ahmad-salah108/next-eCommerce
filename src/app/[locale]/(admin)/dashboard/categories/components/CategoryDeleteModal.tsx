import { Modal } from "../../../components/ui/modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryById } from "@/lib/actions/categories/deleteCategoryById";
import { toast } from "sonner";
import { CategoryType } from "@/types/CategoryType";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  category: CategoryType;
};

function CategoryDeleteModal({
  isModalOpen,
  closeModal,
  category,
}: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: deleteCategoryById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category has been deleted");
      closeModal();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleCategoryDelete() {
    if (!isPending && !isSuccess) mutate(category.id as string);
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      className="max-w-[600px] p-5 lg:p-10"
    >
      <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">
        Delete Category
      </h4>
      <p className="text-[1rem] leading-6 text-gray-500 dark:text-gray-400">
        Are you sure you want to delete{" "}
        <strong>
          &quot;{category.name}
          &quot;
        </strong>{" "}
        category?
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
          onClick={handleCategoryDelete}
          className="bg-red-500 text-white w-20 flex justify-center items-center"
          disabled={isPending || isSuccess}
        >
          {(isPending || isSuccess) && <Spinner />}
          Yes
        </Button>
      </div>
    </Modal>
  );
}

export default CategoryDeleteModal;

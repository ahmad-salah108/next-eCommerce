import { Modal } from "../../../components/ui/modal";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductById } from "@/lib/actions/products/deleteProductById";
import { toast } from "sonner";
import { ProductType } from "@/types/ProductType";
import { routing } from "@/i18n/routing";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  product: ProductType;
  locale: (typeof routing.locales)[number];
};

function ProductDeleteModal({
  isModalOpen,
  closeModal,
  product,
  locale,
}: Props) {
  const queryClient = useQueryClient();
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

  function handleProductDelete() {
    if (!isPending && !isSuccess) mutate(product.id);
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      className="max-w-[600px] p-5 lg:p-10"
    >
      <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">
        Delete Product
      </h4>
      <p className="text-[1rem] leading-6 text-gray-500 dark:text-gray-400">
        Are you sure you want to delete{" "}
        <strong>
          &quot;{product.name[locale]}
          &quot;
        </strong>{" "}
        product?
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
  );
}

export default ProductDeleteModal;

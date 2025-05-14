import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { productDto } from "@/dto/productDto";
import { useDeleteProductMutation } from "@/redux/features/proudct/productApi";
import React from "react";
import { toast } from "sonner";

type props = {
  product: productDto;
};

const DeleteProductDialog = ({ product }: props) => {
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation();

  const handleDelete = async (productId: string) => {
    try {
      const res = await deleteProduct(productId).unwrap();
      if (res.success) {
        toast.success(res.message || "Product deleted successfully!");
      } else {
        toast.info(res.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setIsDeleteOpen(false);
    }
  };

  return (
    <Dialog
      open={isDeleteOpen}
      onOpenChange={setIsDeleteOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="ml-2"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            onClick={() => setIsDeleteOpen(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDelete(product._id!)}
            disabled={isDeleteLoading}
            className="cursor-pointer hover:bg-red-800"
          >
            {isDeleteLoading ? "Deleting..." : "Confirm Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductDialog;

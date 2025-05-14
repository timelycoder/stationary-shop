import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TOrder } from "@/dto/orderDto";
import { useDeleteOrderMutation } from "@/redux/features/order/orderApi";
import React from "react";
import { toast } from "sonner";

type props = {
  order: TOrder;
};

const DeleteOrderDialog = ({ order }: props) => {

  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [deleteOrder, { isLoading: isDeleteLoading, }] =
    useDeleteOrderMutation();

  const handleDelete = async (orderId: string) => {
    try {
      const res = await deleteOrder(orderId).unwrap();
      if (res.success) {
        toast.success(res.message || "Order deleted successfully!");
      } else {
        toast.info(res.message || "Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting delete:", error);
      toast.error("Failed to delete order. Please try again.");
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
            onClick={() => handleDelete(order._id!)}
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

export default DeleteOrderDialog;

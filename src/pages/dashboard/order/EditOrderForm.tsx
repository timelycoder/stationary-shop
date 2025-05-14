/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOrder } from "@/dto/orderDto";
import { useUpdateOrderStatusMutation } from "@/redux/features/order/orderApi";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  order: TOrder;
};

const EditOrderForm = ({ order }: Props) => {
  const [updateOrderStatus, { isLoading: isOrderUpdateLoading }] =
    useUpdateOrderStatusMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [status, setStatus] = useState<TOrder["status"]>(
    order.status || "pending"
  );

  const handleUpdate = async () => {
    try {
      const res = await updateOrderStatus({
        id: order._id!,
        data: { status },
      }).unwrap();

      if (res?.success) {
        toast.success("Order status updated successfully!");
        setIsDialogOpen(false);
      } else {
        toast.info(res.message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Update Status</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-center font-semibold text-lg">
          Update Order
        </DialogTitle>
        <div className="text-center text-gray-500 mb-4">
          <span>Order Number: {order.orderNumber}</span>
          <br />
          <span>Transaction ID: {order.transactionId}</span>
        </div>
        <div className="space-y-4 w-full items-center">
          <Label htmlFor="status">Order Status</Label>
          <Select
            value={status}
            onValueChange={(val) => setStatus(val as TOrder["status"])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipping">Shipping</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter className="flex gap-2 mt-4">
          <Button
            variant={"outline"}
            disabled={isOrderUpdateLoading}
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={isOrderUpdateLoading || status === order.status}
          >
            {isOrderUpdateLoading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrderForm;

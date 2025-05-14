import { useState } from "react";
import {
  Package,
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  ShoppingCart,
  X,
  Check,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { OrderResponseDto, TOrder } from "@/dto/orderDto";
import { useGetOrdersQuery } from "@/redux/features/order/orderApi";
import EditOrderForm from "./EditOrderForm";
import FormatTaka from "@/components/FormatTaka";
import DeleteOrderDialog from "./DeleteOrderDialog";

export default function ManageOrdersPage() {
  const {
    data,
    isLoading: isGetLoading,
    isError: isGetError,
  } = useGetOrdersQuery({});
  const orders: OrderResponseDto[] = data?.data || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TOrder["status"] | "all">(
    "all"
  );

  // Filter orders based on search query and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false ||
      order.products.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Get status badge variant
  const getStatusBadge = (status: TOrder["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "processing":
        return <Badge variant="secondary">Processing</Badge>;
      case "shipping":
        return <Badge variant="default">Shipping</Badge>;
      case "delivered":
        return (
          <Badge
            variant="default"
            color="green"
          >
            Delivered
          </Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
    }
  };

  // Format date
  const formatDate = (date: Date | undefined) => {
    if (!date) return "N/A";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Handle loading state
  if (isGetLoading) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
            <CardDescription>
              Please wait while fetching orders.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Handle error state
  if (isGetError) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>
              There was an error fetching your orders. Please try again later.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold">Manage Orders</h1>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value: string) =>
              setStatusFilter(value as TOrder["status"] | "all")
            }
          >
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter by Status</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipping">Shipping</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View and manage all past orders</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Date
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      {order.isPaid ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          <Check className="h-3 w-3 mr-1" /> Paid
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 border-yellow-200"
                        >
                          <Clock className="h-3 w-3 mr-1" /> Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{order.products.length} item(s)</TableCell>
                    <TableCell className="text-right">
                      <FormatTaka amount={order.totalAmount} />
                    </TableCell>
                    <TableCell className="text-center space-x-3">
                      {/* view */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-transparent"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View order details</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Package className="h-5 w-5" />
                              Order Details - {order.orderNumber}
                            </DialogTitle>
                            <DialogDescription>
                              Placed on {formatDate(order.createdAt)}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid gap-6 py-4">
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                              <div>
                                <h3 className="font-semibold text-lg">
                                  Status
                                </h3>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {getStatusBadge(order.status)}
                                  {order.isPaid ? (
                                    <Badge
                                      variant="outline"
                                      className="bg-green-50 text-green-700 border-green-200"
                                    >
                                      <Check className="h-3 w-3 mr-1" /> Paid
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="bg-yellow-50 text-yellow-700 border-yellow-200"
                                    >
                                      <Clock className="h-3 w-3 mr-1" /> Payment
                                      Pending
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="text-left sm:text-right">
                                <h3 className="font-semibold text-lg">Total</h3>
                                <p className="text-2xl font-bold">
                                  ${order.totalAmount.toFixed(2)}
                                </p>
                                {order.shippingCost !== undefined && (
                                  <p className="text-sm text-muted-foreground">
                                    {order.shippingCost === 0
                                      ? "Free Shipping"
                                      : `Shipping: $${order.shippingCost.toFixed(
                                          2
                                        )}`}
                                  </p>
                                )}
                                {order.couponCode && (
                                  <p className="text-sm text-muted-foreground">
                                    Coupon: {order.couponCode}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="font-semibold mb-1">
                                  Shipping Address
                                </h3>
                                <div className="text-muted-foreground">
                                  <p>{order.shippingAddress.street}</p>
                                  <p>
                                    {order.shippingAddress.city},{" "}
                                    {order.shippingAddress.postalCode}
                                  </p>
                                  <p>{order.shippingAddress.country}</p>
                                </div>
                                {order.contactPhone && (
                                  <div className="mt-2">
                                    <h4 className="font-medium text-sm">
                                      Contact Phone
                                    </h4>
                                    <p className="text-muted-foreground">
                                      {order.contactPhone}
                                    </p>
                                  </div>
                                )}
                              </div>

                              <div>
                                <h3 className="font-semibold mb-1">
                                  Payment & Delivery
                                </h3>
                                <div className="text-muted-foreground">
                                  <p>Transaction ID: {order.transactionId}</p>
                                  {order.deliveryService && (
                                    <p>
                                      Delivery Service: {order.deliveryService}
                                    </p>
                                  )}
                                  {order.trackingNumber && (
                                    <p>
                                      Tracking Number: {order.trackingNumber}
                                    </p>
                                  )}
                                  {order.deliveredAt && (
                                    <p>
                                      Delivered on:{" "}
                                      {formatDate(order.deliveredAt)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            {order.customerNote && (
                              <div>
                                <h3 className="font-semibold mb-1">
                                  Customer Note
                                </h3>
                                <p className="text-muted-foreground">
                                  {order.customerNote}
                                </p>
                              </div>
                            )}

                            <div>
                              <h3 className="font-semibold mb-2">
                                Order Items
                              </h3>
                              <div className="border rounded-md">
                                {order.products.map((item, index) => (
                                  <div
                                    key={item.productId}
                                    className={`flex items-center gap-4 p-4 ${
                                      index !== order.products.length - 1
                                        ? "border-b"
                                        : ""
                                    }`}
                                  >
                                    <img
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      className="w-12 h-12 object-cover rounded-md"
                                    />
                                    <div className="flex-1">
                                      <h4 className="font-medium">
                                        {item.name}
                                      </h4>
                                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                        <p>Qty: {item.quantity}</p>
                                        {item.color && (
                                          <p>Color: {item.color}</p>
                                        )}
                                        {item.size && <p>Size: {item.size}</p>}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium">
                                        ${item.price.toFixed(2)}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        $
                                        {(item.price * item.quantity).toFixed(
                                          2
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <DialogClose asChild>
                              <Button variant="outline">
                                <X className="h-4 w-4 mr-2" />
                                Close
                              </Button>
                            </DialogClose>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {/* edit */}
                      <EditOrderForm order={order} />
                      {/* Delete Dialog */}
                      <DeleteOrderDialog order={order} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No orders found</h3>
              <p className="text-muted-foreground mt-1">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "There is no orders yet"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

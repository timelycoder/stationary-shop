import { TShippingAddress } from "@/redux/features/auth/authSlice";

export type TOrder = {
  _id?: string;
  userId: string;
  products: TOrderItem[];
  totalAmount: number;
  shippingCost?: number;
  shippingAddress: TShippingAddress;
  contactPhone?: string;
  customerNote?: string;
  couponCode?: string;
  // Order number for human reference (e.g., #2025-00123)
  orderNumber?: string;
  status: "pending" | "processing" | "shipping" | "delivered" | "cancelled";
  trackingNumber: string | null;
  deliveryService?: string;
  transactionId: string;
  isPaid?: boolean;
  deliveredAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TOrderItem = {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
  color?: string | null;
  size?: string | null;
};

export type CreateOrderDto = Omit<
  TOrder,
  | "_id"
  | "createdAt"
  | "updatedAt"
  | "status"
  | "deliveredAt"
  | "trackingNumber"
  | "ordrerNumber"
  | "transactionId"
  | "isPaid"
  | "deliveryService"
>;
export type OrderResponseDto = TOrder;

import { TShippingAddress } from "@/redux/features/auth/authSlice";

export type userDto = {
  _id: string;
  name: string;
  email: string;
  age?: number;
  photo?: string;
  userStatus: "active" | "inactive";
  role: "admin" | "user";
  password?: string;
  shippingAddress?: TShippingAddress;
};

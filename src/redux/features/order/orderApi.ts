/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateOrderDto } from "@/dto/orderDto";
import { baseApi, tagTypes } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
      providesTags: [tagTypes.orderTag],
    }),

    getUserOrders: builder.query({
      query: (userId) => ({
        url: `/orders/user/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.orderTag],
    }),

    getOrderById: builder.query({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.orderTag],
    }),

    // update order status
    updateOrderStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.orderTag],
    }),

    // payment gateway stuff
    createOrder: builder.mutation<any, CreateOrderDto>({
      query: (body) => ({
        url: `/orders`,
        method: "POST",
        body
      }),
      invalidatesTags: [tagTypes.orderTag]
    }),
    
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.orderTag]
    }),

  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useDeleteOrderMutation,
  
} = orderApi;

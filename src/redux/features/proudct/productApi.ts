import { baseApi, tagTypes } from "@/redux/api/baseApi";

export type getOneProductArgsType = {
  productId: string;
};

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: [tagTypes.productTag],
    }),

    getSingleProduct: builder.query({
      query: ({ productId }) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.productTag],
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products/add-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.productTag],
    }),

     updateProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `/products/${productId}`,
        method: "PATCH", 
        body: data,
       }),
       invalidatesTags: [tagTypes.productTag],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.productTag],
    }),
    

  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;

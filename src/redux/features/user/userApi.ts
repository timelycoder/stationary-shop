import { baseApi, tagTypes } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),
      providesTags: [tagTypes.userTag],
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.userTag]
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.userTag],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetUsersQuery,
} = userApi;

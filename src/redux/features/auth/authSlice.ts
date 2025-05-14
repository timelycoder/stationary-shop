import { createSlice } from "@reduxjs/toolkit";

export type TShippingAddress = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

export type TAuthUser = {
  id: string;
  name: string;
  age?: number;
  email: string;
  photo?: string | null;
  role: "user" | "admin";
  userStatus: "active" | "inactive";
  shippingAddress?: TShippingAddress;
};

type TAuthState = {
  user: null | TAuthUser;
  token: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: { auth: TAuthState }) => state.auth.user;
export const selectToken = (state: { auth: TAuthState }) => state.auth.token;

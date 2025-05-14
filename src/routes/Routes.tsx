import ErrorPage from "@/components/ErrorPage";
import Main from "@/layout/Main";
import ProtectedRoute from "@/layout/ProtectedRoute";
import AllProducts from "@/pages/allProducts/allProducts/AllProducts";
import About from "@/pages/about/about/About";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import Dashboard from "@/pages/dashboard/home/Dashboard";
import DashboardHome from "@/pages/dashboard/home/DashboardHome";
import ManageProducts from "@/pages/dashboard/product/ManageProducts";
import ManageUsers from "@/pages/dashboard/user/ManageUsers";
import Home from "@/pages/home/home/Home";
import ProductDetails from "@/pages/productDetails/productDetails/ProductDetails";
import PaymentSuccess from "@/pages/payment/PaymentSuccess";

import { createBrowserRouter } from "react-router-dom";
import Cart from "@/pages/cart/cart";
import PaymentFailed from "@/pages/payment/paymentFailed";
import ProfilePage from "@/pages/dashboard/user/ProfilePage";
import Checkout from "@/pages/cart/checkout";
// import ManageOrders from "@/pages/dashboard/order/ManageOrders";
import ViewOrdersPage from "@/pages/dashboard/order/ViewOrders";
import ManageOrdersAlt from "@/pages/dashboard/order/ManageOrdersAlt";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/products/:productId",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/orders/success/:trxId",
        element: (
          <ProtectedRoute roles={["admin", "user"]}>
            <PaymentSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders/fail/:trxId",
        element: (
          <ProtectedRoute roles={["admin", "user"]}>
            <PaymentFailed />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },

      // private routes in main
      {
        path: "/cart",
        element: (
          <ProtectedRoute roles={["admin", "user"]}>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute roles={["admin", "user"]}>
            <Checkout />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute roles={["admin", "user"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "manage-users",
        element: <ProtectedRoute roles={["admin"]}><ManageUsers /></ProtectedRoute>,
      },
      {
        path: "manage-products",
        element: <ProtectedRoute roles={["admin"]}><ManageProducts /></ProtectedRoute>,
      },
      {
        path: "manage-orders",
        element: <ProtectedRoute roles={["admin"]}><ManageOrdersAlt/></ProtectedRoute>,
      },
      {
        path: "view-orders",
        element: <ProtectedRoute roles={["admin", "user"]}><ViewOrdersPage/></ProtectedRoute>,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;

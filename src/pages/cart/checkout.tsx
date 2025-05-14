import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "@/layout/Wrapper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart, selectCartItems } from "@/redux/features/cart/cartSlice";
import CartItemDisabled from "./cartItemDisabled";
import { toast } from "sonner";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { selectUser, TShippingAddress } from "@/redux/features/auth/authSlice";
import OrderForm from "./orderForm";
import { useGetUserByIdQuery } from "@/redux/features/user/userApi";
import { useGetProductsQuery } from "@/redux/features/proudct/productApi";
import { productDto } from "@/dto/productDto";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector(selectUser);
  const userId = loggedUser?.id as string;
  const { data: userData } = useGetUserByIdQuery(userId);
  const user = userData?.data;

  const { data: productsData } = useGetProductsQuery(
    {}
  );
  const products: productDto[] = productsData?.data;

  const cartItems = useAppSelector(selectCartItems);
  const [location, setLocation] = useState("dhaka");
  const [charge, setCharge] = useState(80);
  const subTotal = useMemo(() => {
    return cartItems.reduce((total, val) => total + val.price, 0);
  }, [cartItems]);

  // Form states
  const [shippingAddress, setShippingAddress] = useState<TShippingAddress>({
    street: user?.shippingAddress?.street || "",
    city: user?.shippingAddress?.city || "",
    postalCode: user?.shippingAddress?.postalCode || "",
    country: user?.shippingAddress?.country || "",
  });

  const [contactPhone, setContactPhone] = useState<string>("");

  const [formErrors, setFormErrors] = useState({
    street: false,
    city: false,
    postalCode: false,
    country: false,
    contactPhone: false,
  });

  useEffect(() => {
    if (user) {
      setShippingAddress({
        street: user.shippingAddress?.street || "",
        city: user.shippingAddress?.city || "",
        postalCode: user.shippingAddress?.postalCode || "",
        country: user.shippingAddress?.country || "",
      });
    }
  }, [user]);

  // Validation function
  const validateForm = () => {
    const errors = {
      street: shippingAddress.street.trim() === "",
      city: shippingAddress.city.trim() === "",
      postalCode: shippingAddress.postalCode.trim() === "",
      country: shippingAddress.country.trim() === "",
      contactPhone: contactPhone.trim() === "",
    };

    setFormErrors(errors);

    return !Object.values(errors).includes(true);
  };

  const [createOrder, { isError, error }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    const isValid = validateForm();
    if (!isValid) {
      toast.error("Please fill all the fields correctly.");
      return;
    }

    const isStockValid = await validateStockBeforeOrder();
    if (!isStockValid) {
      return;
    }

    try {
      const toastId = toast.loading("Initiating order...");

      const order = {
        userId: user?._id as string,
        products: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          image: item.image,
          color: item?.selectedColor || null,
          size: item?.selectedSize || null,
        })),
        totalAmount: subTotal + charge,
        shippingCost: charge,
        shippingAddress: shippingAddress,
        contactPhone: contactPhone,
      };

      // Send the order to the server
      const res = await createOrder(order).unwrap();
      dispatch(clearCart());
      if (res) {
        window.location.href = res.url;
        toast.info("Redirecting to payment page", {
          id: toastId,
        });
      } else {
        toast.error("Order failed. Please try again.", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.log("error", error);
    }
  };

  const validateStockBeforeOrder = async () => {
    if (!products) {
      toast.error("Error checking stock. Please try again later.");
      return false;
    }

    // Check if products are available in stock
    for (const item of cartItems) {
      const product = products.find((p) => p._id === item.productId);
      if (!product || product.stock < item.quantity) {
        toast.error(`Insufficient stock for ${item.name}`);
        return false;
      }
    }

    return true;
  };

  if (isError) {
    toast.error("Error Placing Order. Please try again later.");
    console.log("Error placing order:", error);
  }

  return (
    <div className="mx-3 md:mx-0 md:py-20">
      <Wrapper>
        {cartItems.length > 0 && (
          <>
            {/* HEADING AND PARAGRAPH START */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Place Order
              </div>
            </div>
            {/* HEADING AND PARAGRAPH END */}

            {/* CART CONTENT START */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* CART ITEMS START */}
              <div className="flex-[2]">
                <div className="flex items-center justify-between text-lg font-bold">
                  <p>Cart Items</p>
                  <Link
                    to={"/cart"}
                    className="text-gray-600 hover:underline"
                  >
                    Edit Cart
                  </Link>
                </div>
                {cartItems.map((item, index: number) => (
                  <CartItemDisabled
                    key={index}
                    item={item}
                  />
                ))}
              </div>
              {/* CART ITEMS END */}

              {/* SUMMARY START */}
              <div className="flex-[2] flex-col items-start justify-">
                <div className="text-lg font-bold">Summary</div>

                {/* Delivary charge calc START */}
                <div className="my-2">
                  <p className="text-[20px] font-semibold">Delivery Charge</p>
                  <select
                    className="p-3 font-semibold my-1"
                    onChange={(e) => {
                      setLocation(e.target.value);
                      if (e.target.value === "dhaka") {
                        setCharge(80);
                      } else {
                        setCharge(120);
                      }
                    }}
                  >
                    <option
                      value="dhaka"
                      className="border border-gray-300 rounded-lg p-2"
                    >
                      Dhaka
                    </option>
                    <option
                      value="outside-dhaka"
                      className="border border-gray-300 rounded-lg p-2"
                    >
                      Outside Dhaka
                    </option>
                  </select>
                  <p className="text-[20px] font-semibold">
                    Delivery charge for{" "}
                    {location == "dhaka" ? "Dhaka" : "Outside Dhaka"} is &#2547;
                    {charge}
                  </p>
                </div>

                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-medium text-black">
                      Subtotal <br />
                      <span className="text-[14px] md:text-sm">
                        (including delivary charge)
                      </span>
                    </div>
                    <div className="text-md md:text-lg font-medium text-black">
                      &#2547;{subTotal + charge}
                    </div>
                  </div>
                  <div className="text-sm md:text-md py-5 border-t mt-5">
                    The subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </div>
                </div>

                {/* TODO:: Add checkout from here */}
                <p className="text-lg font-semibold mb-1">Customer Details</p>

                {/* The Form Itself */}
                <OrderForm
                  shippingAddress={shippingAddress}
                  setShippingAddress={setShippingAddress}
                  contactPhone={contactPhone}
                  setContactPhone={setContactPhone}
                  onSubmit={handlePlaceOrder}
                  formErrors={formErrors}
                  setFormErrors={setFormErrors}
                />

                {/* BUTTON START */}
                <button
                  className="w-full  py-4 rounded-full bg-green-600 text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
                {/* BUTTON END */}
              </div>
              {/* SUMMARY END */}
            </div>
            {/* CART CONTENT END */}
          </>
        )}

        {/* This is empty screen */}
        {cartItems.length < 1 && (
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <img
              src="/empty-cart.jpg"
              width={300}
              height={300}
              className="w-[300px] md:w-[400px]"
            />
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your cart.
              <br />
              Go ahead and explore top categories.
            </span>
            <Link
              to="/"
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Checkout;

import { useMemo } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const CartOnHeader = () => {
  const cartItems = useAppSelector(selectCartItems);

  const subTotal = useMemo(() => {
    return cartItems.reduce((total, val) => total + val?.price, 0);
  }, [cartItems]);

  return (
    <div className="flex items-center">
      <Link
        to="/cart"
        className="flex items-center hover:text-red-400 space-x-2"
      >
        <span className="font-semibold text-[16px] md:text-[20px] text-red-400">
          {subTotal}&#2547;
        </span>
        <div className="w-10 md:w-14 h-10 md:h-14 rounded-full flex justify-center items-center hover:bg-blue-900/[0.5] cursor-pointer relative">
          <ShoppingCart />
          {cartItems.length > 0 && (
            <div className="font-bold h-[16px] md:h-[18px] min-w-[16px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-secondary text-[10px] md:text-[12px] flex justify-center items-center px-[4px] md:px-[6px]">
              {cartItems.length}
            </div>
          )}
        </div>
      </Link>

      {/* Icon end */}
    </div>
  );
};

export default CartOnHeader;

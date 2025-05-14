import { TCartItem } from "@/redux/features/cart/cartSlice";

const CartItemDisabled = ({item}: {item: TCartItem}) => {
  const p = item;

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[80px] md:w-[110px]">
        <img
          src={p.image}
          alt={p.name}
          width={120}
          height={120}
        />
      </div>
      {/* IMAGE END */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between text-sm">
          {/* PRODUCT TITLE */}
          <div className="md:text-2xl font-semibold text-black/[0.8]">
            {p.name}
          </div>

          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-lg font-medium text-black/[0.5] block md:hidden">
            something
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-[18px] md:text-lg font-bold text-black/[0.5] mt-2">
            Price : &#2547;{item.price}
          </div>
        </div>

        {/* PRODUCT SUBTITLE */}
        <div className=" font-medium text-black/[0.5] hidden md:block">
          something
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-lg">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <p className="text-rose-700">{item.selectedSize}</p>
            </div>

            <div className="flex items-center gap-1">
              <div className="font-semibold">Qty:</div>
              <p className="text-rose-700 ">{item.quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemDisabled;

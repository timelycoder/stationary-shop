import { Button } from "@/components/ui/button";
import Wrapper from "@/layout/Wrapper";
import { ShoppingBag } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const PaymentSuccess = () => {

  const { trxId } = useParams<{ trxId: string }>();
  console.log("Transaction ID:", trxId);
  return (
    <div className="min-h-[650px] flex items-center">
      <Wrapper>
        <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
          <div className="text-2xl font-bold">Thanks for shopping with us!</div>
          <div className="text-lg font-bold mt-2 text-green-800">
            Your order has been placed successfully.
          </div>
          <div className="text-base mt-5">
            For any product related query, drop an email to
          </div>
          <div className="underline">stationary.bd@gmail.com</div>

          <div className="text-base mt-5 flex gap-5 items-center">
            <Link
              to="/dashboard/view-orders"
              className="font-bold mt-5 text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              <Button className="cursor-pointer">
                <ShoppingBag className="mr-2" size={20} /> View Orders
              </Button>
            </Link>
            <Link
              to="/"
              className="font-bold mt-5 text-blue-500 hover:text-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default PaymentSuccess;

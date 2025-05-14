import Wrapper from "@/layout/Wrapper";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="min-h-[650px] flex items-center">
      <Wrapper>
        <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
          <div className="text-2xl font-bold">Ooooops!</div>
          <div className="text-lg font-bold mt-2 text-green-800">
            Your order was not placed!
          </div>
          <div className="text-base mt-5">
            For any product related query, drop an email to
          </div>
          <div className="underline">stationary.bd@gmail.com</div>

          <Link
            to="/"
            className="font-bold mt-5 text-blue-500 hover:text-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default PaymentFailed;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const toastId = toast.loading("Creating account...");

    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const res = await registerUser(userInfo).unwrap();

      if (!res?.success) {
        toast.info(res?.message || "User already exists", { id: toastId });
      }

      toast.success("Account created successfully!", { id: toastId });
      toast.info("Redirecting to login page");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any | unknown) {
      toast.error(err.data.message || "Something went wrong", {
        id: toastId,
      });
      console.error("User registration error:", err);
      return;
    }
  };
  return (
    <div className="py-24">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto space-y-3 sm:text-center">
          <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Create Your Account
          </p>
          <p>
            Sign up to explore exclusive products and enjoy seamless shopping.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="font-medium">Full Name</label>
              <input
                {...register("name")}
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-700 shadow-sm rounded-lg"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                {...register("email")}
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-700 shadow-sm rounded-lg"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                {...register("password")}
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-700 shadow-sm rounded-lg"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-black hover:bg-gray-700 active:bg-gray-700 rounded-lg duration-150"
            >
              Sign Up
            </button>
            <div>
              <p className="w-full mt-2 font-medium">
                Already have an account?{" "}
                <span className="font-bold text-blue-600">
                  {" "}
                  <Link to="/login">Login</Link>{" "}
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

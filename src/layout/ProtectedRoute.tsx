import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { selectToken, selectUser } from "@/redux/features/auth/authSlice";
import Unauthorized from "@/components/Unauthorized";

const ProtectedRoute = ({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles: ("admin" | "user")[];
}) => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);

  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (roles && !roles.includes(user.role)) {
    return (
      <Unauthorized/>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

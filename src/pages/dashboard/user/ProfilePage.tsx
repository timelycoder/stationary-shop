import { selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import UserProfile from "./UserProfile";

export default function ProfilePage() {
  const user = useAppSelector(selectUser);

  const userId = user?.id as string;

  return (
    <div>
      <UserProfile id={userId} />
    </div>
  );
}

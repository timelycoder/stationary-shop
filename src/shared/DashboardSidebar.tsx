import {
  Package2,
  ShoppingCart,
  Users,
  LogOut,
  LayoutDashboard,
  User,
  ListOrderedIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutUser, selectUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
  { name: "Manage Users", path: "/dashboard/manage-users", icon: <Users /> },
  {
    name: "Manage Products",
    path: "/dashboard/manage-products",
    icon: <Package2 />,
  },
  {
    name: "Manage Orders",
    path: "/dashboard/manage-orders",
    icon: <ListOrderedIcon />,
  },
  { name: "Profile", path: "/dashboard/profile", icon: <User /> },
];

const userMenuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
  { name: "Profile", path: "/dashboard/profile", icon: <User /> },
  {
    name: "View Orders",
    path: "/dashboard/view-orders",
    icon: <ShoppingCart />,
  },
];

export default function DashboardSidebar() {
  const user = useAppSelector(selectUser);
  const isAdmin = user?.role === "admin";
  const sidebarMenuItems = isAdmin ? menuItems : userMenuItems;
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const toastId = toast.loading("Logging out...");
    try {
      dispatch(logoutUser());
      toast.success("Logout successful!", { id: toastId });
    } catch (error) {
      toast.error("Logout failed!", { id: toastId });
      console.error("Logout failed:", error);
    }
  };
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-[60px] items-center px-6">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="">Stationary Shop</span>
          </Link>
        </div>
      </SidebarHeader>
      {/* sidebar menu items */}
      <SidebarContent>
        <SidebarMenu>
          {sidebarMenuItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                asChild
                size={"lg"}
                key={index}
              >
                <Link
                  to={item.path}
                  key={index}
                  className="text-lg flex items-center gap-2 rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <span className="text-gray-500">{item.icon}</span>
                  <span className="font-bold">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {/* sidebar footer: for logout etc */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                className="w-full text-left text-red-500 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="font-bold">Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

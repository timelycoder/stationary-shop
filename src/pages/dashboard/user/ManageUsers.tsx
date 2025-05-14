import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetUsersQuery } from "@/redux/features/user/userApi";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { userDto } from "@/dto/userDto";
import UserActionDialog from "./ActionDialog";
import Loader from "@/components/Loader";

const ManageUsers = () => {
  const {
    data,
    isError: isUsersError,
    isLoading: isUsersLoading,
  } = useGetUsersQuery({});

  if (isUsersLoading) return <Loader/>
  if (isUsersError) return <div>Error loading users</div>;

  const users: userDto[] = data?.data || [];

  if (!users.length) return <div>No users found</div>;

  return (
    <div>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-gray-500">Manage your users here.</p>
      </div>

      {/* Table Start */}
      <div className="max-w-[1200px] overflow-x-auto border">
        <div className="">
          <Table>
            <TableCaption>A list of users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Profile Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Account Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={user?.photo || "https://static.vecteezy.com/system/resources/thumbnails/034/210/207/small/3d-cartoon-baby-genius-photo.jpg"}
                        alt={user?.name}
                        
                        className="w-10 h-10 rounded-full"
                      />
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.userStatus == "active" ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell>
                    <UserActionDialog rowData={user} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Table End */}
    </div>
  );
};

export default ManageUsers;

/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useEffect, useState } from "react";
import { Mail, Edit, Save, X, User, Flag, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { TAuthUser } from "@/redux/features/auth/authSlice";
import { userDto } from "@/dto/userDto";
import { toast } from "sonner";

type Props = {
  id?: string;
  user?: userDto;
};

export default function UserProfile({ id, user }: Props) {
  const shouldFetch = !user && !!id;

  const {
    data,
    isLoading: isGetLoading,
    isError: isGetError,
  } = useGetUserByIdQuery(id!, {
    skip: !shouldFetch,
  });

  const [
    updateUser,
    { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess },
  ] = useUpdateUserMutation();

  const finalUser = user || data?.data;

  const [userData, setUserData] = useState({
    ...finalUser,
    shippingAddress: finalUser?.shippingAddress || {
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    if (finalUser) {
      setUserData({
        ...finalUser,
        shippingAddress: finalUser.shippingAddress || {
          street: "",
          city: "",
          postalCode: "",
          country: "",
        },
      });
      setFormData({
        ...finalUser,
        shippingAddress: finalUser.shippingAddress || {
          street: "",
          city: "",
          postalCode: "",
          country: "",
        },
      });
    }
  }, [finalUser, isUpdateSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      // Handle nested shipping address fields
      const [parent, child] = name.split(".");
      setFormData((prev: any) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof TAuthUser] as object),
          [child]: value,
        },
      }));
    } else if (name === "age") {
      // Handle age as number
      setFormData((prev: any) => ({
        ...prev,
        [name]: value ? Number.parseInt(value) : undefined,
      }));
    } else {
      // Handle regular fields
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await updateUser({ id: id!, data: formData });

      if (res.error) {
        toast.error("Error updating user");
        return;
      }
      toast.success("User updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.log("Error updating user:", error);
      toast.error("Error updating user");
    }
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  if (isGetLoading) {
    return <div>Loading...</div>;
  }
  if (isGetError) {
    return <div>Error loading user data</div>;
  }

  if (!finalUser) {
    return <div>User not found</div>;
  }
  return (
    <div className="container mx-auto py-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      {/* using a single component to both show and edit */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col space-y-1.5">
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              View and manage your profile details
            </CardDescription>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit profile</span>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={userData?.photo || "/placeholder.svg"}
                    alt={userData?.name}
                  />
                  <AvatarFallback>
                    {/* {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")} */}
                    {userData.name}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{userData.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={
                        userData.role === "admin" ? "default" : "outline"
                      }
                    >
                      {userData.role}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{userData?.email}</span>
                </div>
                {userData.age && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{userData?.age} years old</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-muted-foreground" />
                  <span>Role: {userData?.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      userData.userStatus === "active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                  <span>Status: {userData?.userStatus}</span>
                </div>
              </div>

              {userData?.shippingAddress && (
                <>
                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Shipping Address
                    </h3>
                    <div className="grid gap-1 text-muted-foreground">
                      <p>{userData.shippingAddress.street}</p>
                      <p>
                        {userData.shippingAddress.city},{" "}
                        {userData.shippingAddress.postalCode}
                      </p>
                      <p>{userData.shippingAddress.country}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <form className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="photo">Photo URL</Label>
                    <Input
                      id="photo"
                      name="photo"
                      value={formData.photo || ""}
                      onChange={handleInputChange}
                      placeholder="URL to profile photo"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value: string) =>
                        handleSelectChange("role", value)
                      }
                    >
                      <SelectTrigger disabled>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userStatus">Status</Label>
                    <Select
                      disabled
                      value={formData.userStatus}
                      onValueChange={(value: string) =>
                        handleSelectChange(
                          "userStatus",
                          value as "active" | "inactive"
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />
                {/* Shipping Address begin */}
                <h3 className="font-medium">Shipping Address</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street</Label>
                    <Input
                      id="street"
                      name="shippingAddress.street"
                      value={formData.shippingAddress?.street || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="shippingAddress.city"
                      value={formData.shippingAddress?.city || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="shippingAddress.postalCode"
                      value={formData.shippingAddress?.postalCode || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="shippingAddress.country"
                      value={formData.shippingAddress?.country || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </form>
          )}
        </CardContent>
        {isEditing && (
          <CardFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isUpdateLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              {isUpdateLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

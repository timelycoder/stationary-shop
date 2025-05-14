import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { userDto } from "@/dto/userDto";

const userFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "user"], {
    errorMap: () => ({ message: "Role is required" }),
  }),
  userStatus: z.enum(["active", "inactive"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
  age: z.coerce.number().optional(),
  photo: z.string().optional(),
  shippingAddress: z
    .object({
      address: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogTitle: React.Dispatch<React.SetStateAction<string>>;
  user: userDto;
};

const EditUserForm = ({ setIsOpen, setDialogTitle, user }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateUser, { isLoading: isUpdateLoading }] =
    useUpdateUserMutation();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "user",
      userStatus: user?.userStatus || "active",
      age: user?.age || undefined,
      photo: user?.photo || "",
      shippingAddress: user?.shippingAddress || {
        address: "",
        city: "",
        state: "",
        country: "",
      },
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user?.name || "",
        email: user?.email || "",
        role: user?.role || "user",
        userStatus: user?.userStatus || "active",
        age: user?.age || undefined,
        shippingAddress: user?.shippingAddress || {
          address: "",
          city: "",
          state: "",
          country: "",
        },
      });
    }
  }, [user]);

  const onSubmit = async (data: UserFormValues) => {
    try {
      const res = await updateUser({ id: user._id, data }).unwrap();
      if (res?.success) {
        toast.success("User updated successfully");
      } else {
        toast.error(res?.message || "User not updated");
      }
    } catch (error) {
      // Handle error
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    } finally {
      setIsOpen(false);
      setDialogTitle("User Details");
    }
  };



  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 overflow-y-auto"
        >
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-400">User Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full" disabled={!isEditing}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full disabled:cursor-not-allowed disabled:opacity-100">
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full" disabled={!isEditing}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full disabled:cursor-not-allowed disabled:opacity-100">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      disabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Photo URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled={!isEditing}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              className={`cursor-pointer ${isEditing ? "hidden" : ""}`}
              disabled={isUpdateLoading}
              variant="outline"
              onClick={() => {
                setIsEditing(true);
                setDialogTitle("Edit User Details");
              }}
            >
              <Edit size={16}/> Edit
            </Button>
            <Button
              type="button"
              className={`cursor-pointer ${isEditing ? "" : "hidden"}`}
              disabled={isUpdateLoading}
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setDialogTitle("Edit User Details");
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`cursor-pointer ${isEditing ? "" : "hidden"}`}
              disabled={isUpdateLoading}
              variant="default"
            >
              {isUpdateLoading ? "Updating..." : "Update User"}
            </Button>
            {/* <Button
              type="button"
              className={`cursor-pointer ${isEditing ? "hidden" : ""}`}
              disabled={isUpdateLoading}
              variant="destructive"
            >
              {isUpdateLoading ? "Deleting..." : "Delete User"}
            </Button> */}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditUserForm;

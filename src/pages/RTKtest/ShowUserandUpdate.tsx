import { selectUser } from "@/redux/features/auth/authSlice";
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";

const ShowUserandUpdate = () => {
    const user = useAppSelector(selectUser);
    console.log(user);
    const { data: logedUser} = useGetUserByIdQuery(user?.id as string);
    console.log(logedUser);

    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    const handleUpdate = async () => {
        const updatedData = {
            shippingAddress: {
            street: "Updated Street",
            city: "Updated City",
            postalCode: "Updated Postal Code",
            country: "Updated Country",
          },
          
          
        };
      
       const res = await updateUser({ id: user?.id, data: updatedData }).unwrap();
       console.log(res);
      };

    
    return (
        <div>
            <p>Email: {user?.email}</p>
            <p>Id: {user?.id}</p>

            <button onClick={handleUpdate} disabled={isUpdating} className="bg-red-600 text-white pointer-coarse:">
                {isUpdating ? "Updating..." : "Update User"}
            </button>



        </div>
    );
};

export default ShowUserandUpdate;
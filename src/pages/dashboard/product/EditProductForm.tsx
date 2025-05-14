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
import { productDto } from "@/dto/productDto";
import { useUpdateProductMutation } from "@/redux/features/proudct/productApi";
import { Textarea } from "@/components/ui/textarea";

const productFormSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(0),
  description: z.string().optional(),
  category: z.string().optional(),
  stock: z.coerce.number().min(0),
  brand: z.string().optional(),
  isFeatured: z.boolean().optional(),
  images: z.array(z.string()).optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

type Props = {
  product: productDto;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditUserForm = ({ product, setIsOpen }: Props) => {
  const [isEditing, setIsEditing] = useState(true);
  const [updateProduct, { isLoading: isUpdateLoading }] =
    useUpdateProductMutation();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
      brand: product.brand,
      isFeatured: product.isFeatured,
      images: product.images,
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        stock: product.stock,
        brand: product.brand,
        isFeatured: product.isFeatured,
        images: product.images,
      });
    }
  }, [product]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const res = await updateProduct({
        productId: product._id,
        data,
      }).unwrap();
      if (res?.success) {
        toast.success("Product updated successfully");
        setIsOpen(false);
      } else {
        toast.error(res?.message || "Product not updated");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle error
      console.error("Error updating product:", error);
      toast.error(error?.data?.message || "Error updating product");
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
                  <FormLabel>Product Name</FormLabel>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter image URLs separated by commas"
                      value={field.value?.join(", ") || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter((s) => s !== "")
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full disabled:cursor-not-allowed disabled:opacity-100">
                      <SelectItem value="generic">Generic</SelectItem>
                      <SelectItem value="toys">Toys</SelectItem>
                      <SelectItem value="decoration">Decoration</SelectItem>
                      <SelectItem value="imported">Imported</SelectItem>
                      <SelectItem value="study-essentials">
                        Study Essentials
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
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
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
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
          </div>
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              className={`cursor-pointer ${isEditing ? "hidden" : ""}`}
              disabled={isUpdateLoading}
              variant="outline"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <Edit size={16} /> Edit
            </Button>
            <Button
              type="button"
              disabled={isUpdateLoading}
              variant="outline"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdateLoading}
              variant="default"
            >
              {isUpdateLoading ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditUserForm;

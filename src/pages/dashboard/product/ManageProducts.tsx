import { productDto } from "@/dto/productDto";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "@/redux/features/proudct/productApi";

import AddProductForm from "./AddProductForm";
import { useState } from "react";
import { toast } from "sonner";
import ProductActionDialog from "./ProductActionDialog";
import Loader from "@/components/Loader";
import DeleteProductDialog from "./DeleteProductDialog";

const ManageProducts = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data,
    isError: isProductsError,
    isLoading: isProductsLoading,
  } = useGetProductsQuery({});

  const [createProduct] = useCreateProductMutation();

  if (isProductsLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (isProductsError) return <div>Error loading products</div>;
  const products: productDto[] = data?.data || [];

  const handleAddProduct = async (newProduct: Partial<productDto>) => {
    try {
      const res = await createProduct(newProduct).unwrap();
      if (res.success) {
        toast.success(res.message || "Product added successfully!");
        setIsOpen(false);
      } else {
        toast.info(res.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <p className="text-gray-500">Add, update or remove products</p>
      </div>
      <div className="flex justify-end items-center mb-4">
        <Dialog
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <DialogTrigger asChild>
            <Button>Add New Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-6">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
              <DialogDescription>
                Fill out the product details below.
              </DialogDescription>
            </DialogHeader>

            <AddProductForm
              onSubmit={(newProduct) => {
                handleAddProduct(newProduct);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full p-4">
        <Table
          className="overflow-x-auto border p-3"
          align="center"
        >
          <TableCaption>A list of products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <img
                    className="w-20"
                    src={product.images[0]}
                    alt="Product Image"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description.slice(0, 20)}...</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>৳ {product.price.toLocaleString("en-BD")}</TableCell>

                <TableCell className="text-right">
                  <ProductActionDialog rowData={product} />
                  {/* Delete Dialog */}
                  <DeleteProductDialog product={product} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageProducts;
import { useCreateProductMutation } from "@/redux/features/proudct/productApi";

const CreateProduct = () => {
    const [createProduct]=useCreateProductMutation();

    const product = {
        name: "PegBoard",
        price: 499,
        description: "Premium quality leather PegBoard",
        stock: 10,
        brand: "Ikea",
        colors: ["brown", "black", "navy"],
        sizes: ["1Ft", "2Ft", "3Ft"],
        images: [
          "https://simplymodular.ph/cdn/shop/products/WoodenColorPegboard4_800x.jpg?v=1652669903"
        ],
        tags: ["pegboard", "stationery", "notebook", "wall-mount"],
        isFeatured: true
      };
      
      const handleCreate =async()=>{
       const res = await createProduct(product).unwrap();
       console.log(res);
      }
      
    return (
        <div>
            <button onClick={handleCreate} type="submit">Click</button>
        </div>
    );
};

export default CreateProduct;
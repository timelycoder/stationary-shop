import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { productDto } from "@/dto/productDto";
import { useGetProductsQuery } from "@/redux/features/proudct/productApi";
import { NavLink } from "react-router-dom";

const FeaturedProducts = () => {
  const { data, isLoading, isError } = useGetProductsQuery({});

  
  if (isLoading) return <div><Loader/></div>;
  if (isError) return <div>Error loading products</div>;
  const products = data?.data || [];
  const featured = products.slice(0, 6);
  return (
    <section className="bg-[#FAF7F0] font-[josefin-sans]">
      <div className="max-w-7xl mx-auto px-4 py-10 ">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center md:py-6">
            Featured Products
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 auto-rows-fr">
          {featured.map((product: productDto) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <NavLink to={`/products`}>
            <Button className="bg-teal-700 text-white hover:bg-teal-800 transition duration-300 ease-in-out cursor-pointer px-4 py-4">
              View All Products
            </Button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

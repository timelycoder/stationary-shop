import { productDto } from "@/dto/productDto";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import FormatTaka from "./FormatTaka";

export default function ProductCard({ product }: { product: productDto }) {
  return (
    <div className={"h-full"}>
      {product !== undefined && (
        <Link
          to={`/products/${product._id}`}
          className="relative flex flex-col h-full overflow-hidden transition-shadow duration-300 bg-white rounded shadow-md"
        >
          <img
            src={`${product.images[0]}`}
            className="object-cover w-full h-64"
            alt={product.name}
          />
          <Badge
            className={clsx(
              "absolute top-0 right-0 text-sm font-semibold bg-yellow-500 text-black",
              product.category === "generic" && "bg-blue-500 text-white",
              product.category === "study-essentials" &&
                "bg-green-500 text-white"
            )}
          >
            {product.category.toUpperCase()}
          </Badge>
          <div className="flex flex-col flex-grow p-5 border border-t-0">
            <div className="mb-2 font-semibold uppercase">
              <p className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700">
                {/* <MapPinned color="#009348" /> */}
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800">
              {product.name}
            </h3>
            <p>
              By <span className="text-teal-700">{product.brand}</span>
            </p>

            {product?.tags?.length ? (
              <p className="my-2">
                <strong>Tags:</strong> <br />
                {product?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-1 bg-gray-200 text-sm rounded py-1 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </p>
            ) : (
              ""
            )}
            <p className="font-semibold mt-1">
              Price: <FormatTaka amount={product.price} />
            </p>
            <p
              className={`mt-1 ${
                product.stock > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock})`
                : "Out of Stock"}
            </p>

            {/* Product Card Footer:: stick to bottom */}
            <div className="mt-auto pt-4">
              <button
                type="button"
                aria-label=""
                className="inline-flex items-center font-semibold transition-colors duration-200 text-green-800 hover:underline cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

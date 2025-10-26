import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./productCard.jsx";
import { products } from "./static/products.js";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGrid() {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const productsPerView = 4;

  const nextProducts = () => {
    if (startIndex + productsPerView < products.length) {
      setStartIndex(startIndex + productsPerView);
    }
  };

  const prevProducts = () => {
    if (startIndex - productsPerView >= 0) {
      setStartIndex(startIndex - productsPerView);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + productsPerView);

  const handleViewAllProducts = () => {
    navigate("/all-products");
  };

  return (
    <section className="w-full bg-linear-to-b from-[#FDF4C3]/70 to-white py-6 lg:py-10">
      <div className="max-w-5xl mx-auto px-4 lg:px-6 relative">
        
        {/* Navigation Arrows */}
        <button
          onClick={prevProducts}
          disabled={startIndex === 0}
          className="hidden lg:flex absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={nextProducts}
          disabled={startIndex + productsPerView >= products.length}
          className="hidden lg:flex absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Product Grid with minimal gap matching reference */}
        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 w-full">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>

        {/* View All Products Button */}
        <div className="flex justify-center">
          <button 
            onClick={handleViewAllProducts}
            className="bg-[#FFEA01] text-gray-800 font-semibold text-sm lg:text-base px-6 py-2.5 rounded-full transition-colors shadow-sm hover:shadow-md hover:bg-[#FFD700]"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
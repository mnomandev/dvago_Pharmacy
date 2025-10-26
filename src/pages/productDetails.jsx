import { ChevronLeft, ShoppingCart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../components/static/products.js";
import { useCart } from "../hooks/useCart";
import QuantitySelector from "../components/QuantitySelector";
import { useEffect } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(item => item.id.toString() === id);
  
  const { 
    quantity, 
    increaseQuantity, 
    decreaseQuantity, 
    handleAddToCart,
    updateProduct 
  } = useCart(product);

  // Update the product in the hook when it changes
  useEffect(() => {
    if (product) {
      updateProduct(product);
    }
  }, [product, updateProduct]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-[#74BD43] text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#74BD43]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const productImages = [product.image];

  const handleAddToCartClick = () => {
    handleAddToCart(product); // Explicitly pass product for reliability
  };

  const handleBuyNow = () => {
    handleAddToCart(product); // Explicitly pass product
    navigate("/cart");
  };

  const formatPrice = (price) => {
    return price?.toLocaleString('en-IN') || '0';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#74BD43]"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Product Details</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Product Images & Details */}
          <div className="space-y-6">
            {/* Image Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="rounded-lg flex items-center justify-center p-4 bg-gray-50">
                <img
                  src={productImages[0]}
                  alt={product.name}
                  className="w-full max-w-md h-64 sm:h-80 object-contain"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                    e.target.alt = 'Product image not available';
                  }}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Product Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {product.description || 'No description available.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info & Actions */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center gap-2 text-yellow-500">
                  <span>★</span>
                  <span className="text-gray-700 font-medium text-sm sm:text-base">{product.rating}</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Price Section */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-[#74BD43]">
                  Rs. {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-lg sm:text-xl text-gray-400 line-through">
                      Rs. {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Quantity & Actions Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold text-gray-900">Quantity</span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  size="md"
                />
              </div>

              {/* Total Price */}
              <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
                <span className="text-lg font-semibold text-gray-900">Total Price</span>
                <span className="text-xl sm:text-2xl font-bold text-[#74BD43]">
                  Rs. {formatPrice(product.price * quantity)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCartClick}
                  className="flex-1 bg-white border-2 border-[#74BD43] text-[#74BD43] font-semibold py-4 rounded-xl hover:bg-green-50 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#74BD43]"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#74BD43] text-white font-semibold py-4 rounded-xl hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#74BD43] focus:ring-offset-2"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
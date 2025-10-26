import { Heart, ShoppingCart, Star } from "lucide-react";
import Badge from '../assets/discount/badge.svg';
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { memo } from "react";

const ProductCard = memo(({
    id,
    name,
    price,
    originalPrice,
    discount,
    rating,
    image,
}) => {
    const navigate = useNavigate();
    const { handleQuickAdd } = useCart();

    const handleCardClick = () => {
        navigate(`/product/${id}`);
    };

    const handleCartClick = (e) => {
        e.stopPropagation();
        handleQuickAdd({
            id,
            name,
            price,
            image,
        });
    };

    const handleWishlistClick = (e) => {
        e.stopPropagation();
        console.log('Added to wishlist:', { id, name });
    };

    const formatPrice = (price) => {
        return price?.toLocaleString('en-IN') || '0';
    };

    return (
        <div
            className="bg-white rounded-sm overflow-hidden shadow-xs hover:shadow-sm transition-all group relative cursor-pointer border border-gray-100 w-full mx-auto"
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick();
                }
            }}
            aria-label={`View ${name} details`}
        >
            {/* Product Image Section */}
            <div className="relative">
                {/* Product Image */}
                <div className="w-full aspect-square overflow-hidden">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Discount Badge */}
                {discount && (
                    <div className="absolute top-2 left-2 z-10 w-10 h-10">
                        <img
                            src={Badge}
                            alt="Discount Badge"
                            className="absolute inset-0 w-full h-full"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-800">
                            <span className="text-[10px] font-bold leading-tight">{discount}%</span>
                            <span className="text-[10px] font-bold leading-tight">OFF</span>
                        </div>
                    </div>
                )}

                {/* Rating & Action Icons */}
                <div className="absolute -bottom-3 left-0 w-full flex items-center justify-between px-2">
                    <div className="flex items-center gap-1 bg-[#74BD43] text-white px-3 py-1 rounded-full text-[8px] font-semibold shadow-xs">
                        <Star className="w-3 h-3" fill="currentColor" />
                        <span className="text-[12px]">{rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        {/* Wishlist Button */}
                        <button
                            className="w-8 h-8 bg-white shadow-xs hover:bg-red-50 rounded-full flex items-center justify-center transition-all border border-[#BB5A77] focus:outline-none focus:ring-2 focus:ring-red-200"
                            onClick={handleWishlistClick}
                            aria-label={`Add ${name} to wishlist`}
                        >
                            <Heart className="w-4 h-4 text-[#BB5A77]" />
                        </button>

                        {/* Cart Button */}
                        <button
                            className="w-8 h-8 bg-white shadow-xs hover:bg-green-50 rounded-full flex items-center justify-center transition-all border border-[#74BD43] focus:outline-none focus:ring-2 focus:ring-green-200"
                            onClick={handleCartClick}
                            aria-label={`Add ${name} to cart`}
                        >
                            <ShoppingCart className="w-4 h-4 text-[#74BD43]" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Info Section */}
           <div className="p-3 pt-5">
    <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 leading-tight">
        {name}
    </h3>

    <div className="flex items-center gap-2">
        <span className="text-[#74BD43] font-bold text-sm">
            Rs. {formatPrice(price)}
        </span>
        {originalPrice && originalPrice > price && (
            <span className="text-gray-400 text-xs line-through">
                Rs. {formatPrice(originalPrice)}
            </span>
        )}
    </div>
</div>
        </div>
    );
});

export default ProductCard;
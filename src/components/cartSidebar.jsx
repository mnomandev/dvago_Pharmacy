import { useSelector, useDispatch } from 'react-redux';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { removeItemFromCart, updateItemQuantity, clearCart } from '../store/cartSlice';
import QuantitySelector from './quantitySelector.jsx';
// import { useCart } from '../hooks/useCart.js';

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);
  // const { handleQuickAdd } = useCart(); // For consistency

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      // If quantity becomes 0, remove the item instead
      dispatch(removeItemFromCart(itemId));
      return;
    }
    
    dispatch(updateItemQuantity({
      id: itemId,
      quantity: newQuantity
    }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', items);
    onClose();
    // Navigate to checkout page or show checkout modal
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(price)) return '0';
    return Math.max(0, price).toLocaleString('en-IN');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity"
          onClick={handleBackdropClick}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed top-0 right-0 h-full w-full sm:w-80 lg:w-96 bg-white shadow-xl z-50 
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-[#74BD43]" />
            <h2 className="text-lg font-bold text-gray-800">
              Cart ({totalQuantity || 0})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#74BD43]"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {!items || items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 text-sm">Add some products to get started</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex gap-3">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                          e.target.alt = 'Product image not available';
                        }}
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                        {item.name}
                      </h4>
                      <p className="text-[#74BD43] font-semibold text-sm mb-2">
                        Rs. {formatPrice(item.price)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <QuantitySelector
                          quantity={item.quantity}
                          onIncrease={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          onDecrease={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          size="sm"
                        />
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Item Total */}
                      <div className="text-right text-xs font-medium text-gray-700 mt-2">
                        Total: Rs. {formatPrice(item.totalPrice)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items && items.length > 0 && (
          <div className="border-t border-gray-200 bg-white p-4 shrink-0 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-gray-900">Total Amount</span>
              <span className="text-lg font-bold text-[#74BD43]">
                Rs. {formatPrice(totalAmount)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-[#74BD43] text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#74BD43] focus:ring-offset-2 text-sm"
              >
                Proceed to Checkout
              </button>
              
              <button
                onClick={handleClearCart}
                className="w-full bg-gray-100 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
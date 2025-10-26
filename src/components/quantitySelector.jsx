import { Minus, Plus } from "lucide-react";
import { memo } from "react";

const QuantitySelector = memo(({ 
  quantity, 
  onIncrease, 
  onDecrease, 
  size = "md",
  disabled = false 
}) => {
  const sizeClasses = {
    sm: {
      button: "w-7 h-7",
      icon: "w-3 h-3",
      text: "text-sm",
      span: "w-7"
    },
    md: {
      button: "w-10 h-10 sm:w-12 sm:h-12",
      icon: "w-3 h-3 sm:w-4 sm:h-4",
      text: "text-lg sm:text-xl",
      span: "w-8 sm:w-12"
    },
    lg: {
      button: "w-12 h-12 sm:w-14 sm:h-14",
      icon: "w-4 h-4 sm:w-5 sm:h-5",
      text: "text-xl sm:text-2xl",
      span: "w-10 sm:w-14"
    }
  };

  const { button, icon, text, span } = sizeClasses[size];

  const handleDecrease = (e) => {
    e.stopPropagation();
    onDecrease?.();
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    onIncrease?.();
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={disabled || quantity <= 1}
        className={`${button} rounded border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#74BD43] focus:ring-opacity-50`}
        aria-label="Decrease quantity"
      >
        <Minus className={icon} />
      </button>
      <span className={`${text} ${span} font-bold text-center bg-white py-1 rounded border border-gray-200 select-none`}>
        {quantity}
      </span>
      <button
        type="button"
        onClick={handleIncrease}
        disabled={disabled}
        className={`${button} rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#74BD43] focus:ring-opacity-50`}
        aria-label="Increase quantity"
      >
        <Plus className={icon} />
      </button>
    </div>
  );
});

export default QuantitySelector;
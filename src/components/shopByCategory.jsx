import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { createPortal } from "react-dom";
import { categories } from "./static/products.js";
import { useFilter } from "../context/FilterContext.jsx";

const ShopByCategory = () => {
  const { navigateToAllProducts } = useFilter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // Handle dropdown position
  useEffect(() => {
    if (isMenuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isMenuOpen]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle category click - navigate to all products with category filter
  const handleCategoryClick = (categoryName) => {
    navigateToAllProducts(categoryName, "All");
    setIsMenuOpen(false);
    setActiveCategory(null);
  };

  // Handle subcategory click - navigate to all products with category and subcategory filter
  const handleSubcategoryClick = (categoryName, subcategoryName) => {
    navigateToAllProducts(categoryName, subcategoryName);
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
    setActiveCategory(null);
  };

  return (
    <div
      className=" bg-white relative z-40 border-b border-gray-200"
      onMouseLeave={() => {
        setIsMenuOpen(false);
        setActiveCategory(null);
      }}
    >
      <div className="container mx-auto px-4 lg:px-6">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center h-16">
          {/* Dropdown Trigger */}
          <div
            ref={buttonRef}
            onMouseEnter={() => setIsMenuOpen(true)}
            className="flex items-center justify-between bg-[#E6E6E6] px-6 h-16 min-w-64 cursor-pointer hover:bg-gray-300 transition-colors shrink-0 border-r border-gray-300"
          >
            <span className="font-medium text-[#2F2C2C] text-lg">
              Shop By Category
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-700 transition-transform ${
                isMenuOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {/* Static horizontal categories */}
          <div className="flex items-center gap-8 flex-1 px-6 overflow-x-auto">
            <button 
     
              className="text-base font-medium text-gray-800 hover:text-[#74BD43] whitespace-nowrap transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              OCT And Health Need
            </button>
            <button 
              
              className="text-base font-medium text-gray-800 hover:text-[#74BD43] whitespace-nowrap transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
            >
               OCT And Health Need
            </button>
            <button 
           
              className="text-base font-medium text-gray-800 hover:text-[#74BD43] whitespace-nowrap transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
            >
               OCT And Health Need
            </button>
            <button 
              className="text-base font-medium text-gray-800 hover:text-[#74BD43] whitespace-nowrap transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
            >
               OCT And Health Need
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2 bg-[#E6E6E6] px-4 py-3 rounded-lg min-w-40"
            >
              <Menu className="w-5 h-5 text-gray-700" />
              <span className="font-medium text-[#2F2C2C] text-sm">
                Shop By Category
              </span>
            </button>

            {/* Mobile quick categories */}
            <div className="flex items-center gap-2 overflow-x-auto flex-1 ml-2">
              <button 
                className="text-sm font-medium text-black hover:text-green-600 whitespace-nowrap px-3 py-2 rounded transition-colors hover:bg-green-100"
              >
                OCT And Health Need
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-white z-50 lg:hidden">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Mobile Categories List */}
              <div className="overflow-y-auto h-full pb-20">
                {categories.map((category, index) => (
                  <div key={index} className="border-b border-gray-100">
                    <button
                      onClick={() =>
                        setActiveCategory(
                          activeCategory === category.name ? null : category.name
                        )
                      }
                      className="flex items-center justify-between w-full px-4 py-4 text-left hover:bg-[#74BD43] hover:text-white transition-colors"
                    >
                      <span className="font-medium text-gray-800 text-base">
                        {category.name}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-600 transition-transform ${
                          activeCategory === category.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Mobile Subcategories */}
                    {activeCategory === category.name && (
                      <div className="bg-gray-50 pl-6">
                        {category.subcategories.map((subcategory, i) => (
                          <button
                            key={i}
                            onClick={() => handleSubcategoryClick(category.name, subcategory)}
                            className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-[#74BD43] hover:text-white transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            {subcategory}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* View All Categories Button */}
                <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0">
                  <button
                    onClick={() => {
                      navigateToAllProducts("All", "All");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-[#74BD43] text-white font-semibold py-3 px-6 rounded-lg text-center hover:bg-green-600 transition-colors"
                  >
                    View All Categories
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Dropdown Menu */}
      {isMenuOpen &&
        createPortal(
          <div
            className="hidden lg:block absolute w-80 bg-white shadow-xl rounded-lg z-50 border border-gray-200"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
          >
            {categories.map((cat, index) => (
              <div key={index} className="relative group">
                {/* Main Category */}
                <div
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === cat.name ? null : cat.name
                    )
                  }
                  className={`px-4 py-3 cursor-pointer flex justify-between items-center hover:bg-[#74BD43] hover:text-white transition-colors ${
                    activeCategory === cat.name
                      ? "bg-gray-100 font-semibold"
                      : ""
                  }`}
                >
                  <span className="text-gray-700 text-base font-medium group-hover:text-white">
                    {cat.name}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform group-hover:text-white ${
                      activeCategory === cat.name ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Subcategories */}
                {activeCategory === cat.name && (
                  <div className="absolute top-0 left-full bg-white shadow-lg rounded-lg w-64 z-50 border border-gray-200">
                    {cat.subcategories.map((sub, i) => (
                      <button
                        key={i}
                        onClick={() => handleSubcategoryClick(cat.name, sub)}
                        className="block w-full text-left px-4 py-2 hover:bg-[#74BD43] hover:text-white text-sm font-medium text-gray-700 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* View All Button */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <button
                onClick={() => handleCategoryClick("All")}
                className="w-full bg-[#74BD43] text-white font-semibold py-2 rounded text-center hover:bg-green-600 transition-colors text-sm"
              >
                View All Products
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ShopByCategory;
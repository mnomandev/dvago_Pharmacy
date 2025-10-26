import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Filter, ChevronDown, ChevronUp, X } from "lucide-react";
import ProductCard from "../components/productCard.jsx";
import { products, categories } from "../components/static/products.js";
import { useFilter } from "../context/FilterContext.jsx";

const AllProductsPage = () => {
  const navigate = useNavigate();
  const { 
    selectedCategory, 
    selectedSubcategory, 
    setSelectedCategory, 
    setSelectedSubcategory,
    clearFilters 
  } = useFilter();
  
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close filters when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilters && isMobile && !event.target.closest('.filter-sidebar')) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilters, isMobile]);

  // Filter products by selected category and subcategory
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const subcategoryMatch = selectedSubcategory === "All" || product.subcategory === selectedSubcategory;
    return categoryMatch && subcategoryMatch;
  });

  // Toggle category expansion
  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory("All");
    if (isMobile) {
      setShowFilters(false);
    }
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    if (isMobile) {
      setShowFilters(false);
    }
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">All Products</h1>
            </div>
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 bg-[#74BD43] text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
            >
              <Filter className="w-4 h-4" />
              Filters
              {(selectedCategory !== "All" || selectedSubcategory !== "All") && (
                <span className="bg-white text-[#74BD43] rounded-full w-5 h-5 text-xs flex items-center justify-center ml-1">
                  !
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Mobile Filter Overlay */}
          {showFilters && isMobile && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" />
          )}

          {/* Sidebar - Categories Filter */}
          <div className={`
            filter-sidebar
            ${showFilters ? 'fixed lg:static inset-y-0 left-0 z-50 lg:z-auto' : 'hidden lg:block'}
            w-full lg:w-64 shrink-0 bg-white lg:bg-transparent
          `}>
            <div className="h-full lg:h-auto overflow-y-auto bg-white lg:rounded-xl lg:shadow-sm p-4 sm:p-6 lg:sticky lg:top-24">
              {/* Mobile Header for Filters */}
              <div className="flex items-center justify-between mb-4 sm:mb-6 lg:hidden">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4 hidden lg:block">Categories</h3>
              
              {/* All Categories Button */}
              <button
                onClick={() => handleCategorySelect("All")}
                className={`w-full text-left px-3 py-3 sm:py-2 rounded-lg transition-colors mb-4 text-base sm:text-sm ${
                  selectedCategory === "All"
                    ? 'bg-[#74BD43] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="font-medium">All Categories</span>
                <span className="text-sm opacity-75 ml-2">
                  ({products.length})
                </span>
              </button>

              <div className="space-y-2">
                {categories.map((category) => {
                  const productCount = products.filter(p => p.category === category.name).length;
                  
                  return (
                    <div key={category.name} className="border-b border-gray-100 last:border-b-0 pb-2 last:pb-0">
                      {/* Category Button */}
                      <button
                        onClick={() => handleCategorySelect(category.name)}
                        className={`w-full text-left px-3 py-3 sm:py-2 rounded-lg transition-colors flex items-center justify-between text-base sm:text-sm ${
                          selectedCategory === category.name
                            ? 'bg-[#74BD43] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="font-medium">
                          {category.name}
                          <span className="text-sm opacity-75 ml-2">
                            ({productCount})
                          </span>
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCategory(category.name);
                          }}
                          className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                        >
                          {expandedCategories[category.name] ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </button>

                      {/* Subcategories */}
                      {expandedCategories[category.name] && (
                        <div className="ml-3 mt-2 space-y-1 border-l-2 border-gray-200 pl-3">
                          {category.subcategories.map((subcategory) => {
                            const subcategoryCount = products.filter(
                              p => p.category === category.name && p.subcategory === subcategory
                            ).length;
                            
                            return (
                              <button
                                key={subcategory}
                                onClick={() => handleSubcategorySelect(subcategory)}
                                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                                  selectedSubcategory === subcategory
                                    ? 'bg-green-100 text-[#74BD43] font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                {subcategory}
                                <span className="text-xs opacity-75 ml-2">
                                  ({subcategoryCount})
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Clear Filters Button - Mobile */}
              {(selectedCategory !== "All" || selectedSubcategory !== "All") && (
                <button
                  onClick={handleClearFilters}
                  className="w-full mt-6 lg:hidden bg-gray-100 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Active Filters Bar - Mobile */}
            {(selectedCategory !== "All" || selectedSubcategory !== "All") && (
              <div className="lg:hidden bg-white rounded-lg shadow-sm p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 truncate">
                      <span className="font-medium">{selectedCategory}</span>
                      {selectedSubcategory !== "All" && (
                        <span className="mx-2">•</span>
                      )}
                      {selectedSubcategory !== "All" && selectedSubcategory}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {filteredProducts.length} products
                    </p>
                  </div>
                  <button
                    onClick={handleClearFilters}
                    className="text-[#74BD43] hover:text-green-600 font-medium text-sm ml-2"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Filter Info - Desktop */}
            {(selectedCategory !== "All" || selectedSubcategory !== "All") && (
              <div className="hidden lg:block bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                      {selectedCategory === "All" ? "All Products" : selectedCategory}
                      {selectedSubcategory !== "All" && ` - ${selectedSubcategory}`}
                    </h2>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      {filteredProducts.length} products found
                    </p>
                  </div>
                  <button
                    onClick={handleClearFilters}
                    className="text-[#74BD43] hover:text-green-600 font-medium text-sm sm:text-base"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}

            {/* Products Grid - Updated for mobile */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 lg:py-16">
                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base mb-4">
                    Try adjusting your filters to see more products.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="bg-[#74BD43] text-white font-medium py-2 px-6 rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FilterContext = createContext();

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export const FilterProvider = ({ children }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");

  const navigateToAllProducts = (category = "All", subcategory = "All") => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    navigate("/all-products");
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedSubcategory("All");
  };

  const value = {
    selectedCategory,
    selectedSubcategory,
    setSelectedCategory,
    setSelectedSubcategory,
    navigateToAllProducts,
    clearFilters
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};
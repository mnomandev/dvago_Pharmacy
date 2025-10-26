import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import ProductDetails from './pages/productDetails.jsx';
import AllProductsPage from './pages/AllProductsPage.jsx';
import { FilterProvider } from "./context/FilterContext.jsx";

const App = () => {

  return (
    <Router>
      <FilterProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/all-products" element={<AllProductsPage />} />
          </Routes>
        </div>
      </FilterProvider>
    </Router>
  );
}

export default App;
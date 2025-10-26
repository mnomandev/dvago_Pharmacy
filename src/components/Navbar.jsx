import logo from '../assets/logo.svg';
import locationIcon from "../assets/location.svg";
import cartIcon from "../assets/cart.svg";
import profileIcon from "../assets/profile.svg";
import heartIcon from "../assets/heart.svg";
import search from "../assets/search.svg";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CartSidebar from './CartSidebar.jsx';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const navigate = useNavigate();

    return (
        <>
            <nav className=" bg-[#74BD43]">
                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center justify-between min-h-24 px-8 relative">
                    {/* Logo Section - White curved background */}
                    <div onClick={() => navigate('/')} className="flex items-center justify-center bg-white h-24 w-68 rounded-tr-[60px] rounded-br-[60px] shadow-lg -ml-8 relative z-10">
                        <img src={logo} alt="DVAGO Logo" className="ml-12 w-38"/>
                    </div>

                    {/* Main Navigation Content */}
                    <div className="flex items-center justify-between flex-1 max-w-6xl mx-auto">
                        {/* Location Button */}
                        <button className="flex items-center gap-3 text-white hover:opacity-90 transition-opacity">
                            <img src={locationIcon} alt="Location" className="h-6 w-6 filter brightness-0 invert ml-3" />
                            <span className="text-sm leading-tight whitespace-nowrap text-left">
                                Select your<br/>nearest store
                            </span>
                        </button>
                        
                        {/* Vertical Divider Line */}
                        <div className="bg-white w-px h-12 mx-4"></div>

                        {/* Search Bar */}
                        <div className="flex items-center bg-linear-to-r from-[#C7E995] to-[#A2D45E] rounded-full px-7 py-2 w-96 border border-white border-opacity-30">
                            <img src={search} alt="search" className='w-5 h-5 mr-3' />
                            <input
                                type="text"
                                placeholder='Search for "Nutrition & Supplements"'
                                className="bg-transparent outline-none text-base flex-1 placeholder:text-black font-semibold"
                            />
                        </div>

                        {/* Instant Order Button */}
                        <button className="bg-[#FFD700] hover:bg-[#FFC700] text-gray-900 font-bold py-2 px-6 rounded-full shadow-md transition-all whitespace-nowrap">
                            Instant Order
                        </button>

                        {/* Icons */}
                        <div className="flex items-center gap-1">
                            <button className="p-2 hover:opacity-80 transition-opacity">
                                <img src={profileIcon} alt="Profile" className="h-7 w-7 filter brightness-0 invert" />
                            </button>
                            <button className="p-2 hover:opacity-80 transition-opacity">
                                <img src={heartIcon} alt="Wishlist" className="h-7 w-7 filter brightness-0 invert" />
                            </button>
                            <button 
                                className="relative p-2 hover:opacity-80 transition-opacity"
                                onClick={() => setIsCartOpen(true)}
                            >
                                <img src={cartIcon} alt="Cart" className="h-7 w-7 filter brightness-0 invert" />
                                {totalQuantity > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {totalQuantity}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden">
                    {/* Top Bar - Logo, Search & Hamburger */}
                    <div className="flex items-center justify-between h-20 relative">
                        {/* Logo with full white background like desktop */}
                        <div onClick={() => navigate('/')} className="absolute left-0 top-0 flex items-center justify-center bg-white h-20 w-42 rounded-tr-[50px] rounded-br-[50px] shadow-lg z-10">
                            <img 
                                src={logo} 
                                alt="DVAGO Logo" 
                                className="h-10 w-auto ml-7" 
                            />
                        </div>

                        {/* Right side icons */}
                        <div className="flex items-center gap-4 ml-auto pr-4 z-20">
                            {/* Wishlist Icon */}
                            <button className="p-2">
                                <img src={heartIcon} alt="Wishlist" className="h-7 w-7 cursor-pointer hover:opacity-80 transition-opacity filter brightness-0 invert" />
                            </button>

                            {/* Cart */}
                            <div 
                                className="relative cursor-pointer"
                                onClick={() => setIsCartOpen(true)}
                            >
                                <img src={cartIcon} alt="Cart" className="h-6 w-6 filter brightness-0 invert" />
                                {totalQuantity > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                        {totalQuantity}
                                    </span>
                                )}
                            </div>
                            
                            {/* Hamburger Menu */}
                            <button 
                                className="flex flex-col gap-1 p-1"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                                <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                            </button>
                        </div>
                    </div>

                    {/* Location Bar */}
                    <div className="bg-[#68a83c] px-4 py-3">
                        <button className="flex items-center justify-center gap-2 text-white text-sm w-full">
                            <img src={locationIcon} alt="Location" className="h-4 w-4 filter brightness-0 invert" />
                            <span className="font-medium">Select your nearest store</span>
                        </button>
                    </div>

                    {/* Mobile Menu - Slides down when hamburger is clicked */}
                    <div className={`bg-[#74BD43] transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-48 py-4' : 'max-h-0 py-0'}`}>
                        <div className="px-4 space-y-4">
                            <button className="flex items-center gap-3 text-white w-full text-left py-2">
                                <img src={profileIcon} alt="Profile" className="h-5 w-5 filter brightness-0 invert" />
                                <span>My Account</span>
                            </button>
                            
                            <button className="bg-[#FFD700] text-gray-900 font-semibold py-2 px-4 rounded-full w-full text-center">
                                Instant Order
                            </button>
                        </div>
                    </div>

                    {/* Search Overlay - Appears when search icon is clicked */}
                    <div className="bg-white px-4 py-3 border-t border-gray-200">
                        <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
                            <img src={search} alt="Search" className="h-4 w-4 mr-2" />
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="bg-transparent outline-none text-sm flex-1 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Cart Sidebar */}
            <CartSidebar 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
            />
        </>
    );
};

export default Navbar;
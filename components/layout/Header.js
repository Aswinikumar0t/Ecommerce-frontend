'use client';

import { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  

  const addToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setCartCount(cartCount + 1);
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          
          {/* Logo and Content side by side - Logo spans both rows */}
          <div className="flex items-start gap-3 md:gap-6">
            
            {/* Logo - spans both rows vertically */}
            <div className="flex-shrink-0">
              <Link href="/">
                <img 
                  src="/images/nillsweet_logo.png" 
                  alt="NilSweet Logo"
                  className="h-12 md:h-20 w-auto"  // Smaller on mobile, taller on desktop
                />
              </Link>
            </div>

            {/* Right side content (both rows) */}
            <div className="flex-1">
              
              {/* Row 1: Search Bar + Icons */}
              <div className="flex items-center justify-between gap-2 md:gap-4">
                {/* Search Bar - responsive width */}
                <div className="flex-1 max-w-lg md:ml-40 md:mr-10">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-1.5 md:px-4 md:py-2 pl-8 md:pl-10 pr-3 md:pr-4 text-sm md:text-base border border-gray-300 rounded-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />
                    <Search className="absolute left-2 md:left-3 top-2 md:top-2.5 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  </div>
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-3 md:space-x-6 flex-shrink-0">
                  <Heart className="w-4 h-4 md:w-5 md:h-5 text-gray-600 cursor-pointer hover:text-green-600" />
                  <div className="relative cursor-pointer" onClick={() => setShowCart(!showCart)}>
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-gray-600 hover:text-green-600" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <User className="w-4 h-4 md:w-5 md:h-5 text-gray-600 cursor-pointer hover:text-green-600" />
                  <Menu className="w-5 h-5 md:w-5 md:h-5 text-gray-600 cursor-pointer md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} />
                </div>
              </div>

              {/* Row 2: Navigation Options - hidden on mobile, shown on desktop */}
              <div className="hidden md:flex justify-center space-x-6 mt-6">
                <Link href="/" className="text-gray-700 hover:text-green-600 text-sm">Home</Link>
                <Link href="/categories" className="text-gray-700 hover:text-green-600 text-sm">Categories</Link>
                <Link href="/shop" className="text-gray-700 hover:text-green-600 text-sm">Shop</Link>
                <Link href="/offers" className="text-gray-700 hover:text-green-600 text-sm">Offers</Link>
                <Link href="/brands" className="text-gray-700 hover:text-green-600 text-sm">Brands</Link>
                <Link href="/blog" className="text-gray-700 hover:text-green-600 text-sm">Blog</Link>
                <Link href="/about-us" className="text-gray-700 hover:text-green-600 text-sm">About Us</Link>
                <Link href="/contact-us" className="text-gray-700 hover:text-green-600 text-sm">Contact Us</Link>
              </div>

            </div>
          </div>

        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t py-4 px-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-green-600">Home</Link>
              <Link href="/categories" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-green-600">Categories</Link>
              <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-green-600">Shop</Link>
              <Link href="/offers" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-green-600">Offers</Link>
              <Link href="/brands" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-green-600">Brands</Link>
              <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-green-600">Blog</Link>
              <Link href="/about-us" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-green-600">About Us</Link>
              <Link href="/contact-us" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-green-600">Contact Us</Link>
            </div>
          </div>
        )}

        {/* Cart Sidebar - responsive width */}
        {showCart && (
          <div className="fixed right-0 top-0 h-full w-64 md:w-80 bg-white shadow-xl z-50 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg md:text-xl font-bold">Your Cart</h3>
              <X className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" onClick={() => setShowCart(false)} />
            </div>
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-sm md:text-base">Your cart is empty</p>
            ) : (
              <>
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between mb-2 text-sm md:text-base">
                    <span>{item.name}</span>
                    <span>₹{item.price} x {item.quantity}</span>
                  </div>
                ))}
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between font-bold text-sm md:text-base">
                    <span>Total:</span>
                    <span>₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
                  </div>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 text-sm md:text-base">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
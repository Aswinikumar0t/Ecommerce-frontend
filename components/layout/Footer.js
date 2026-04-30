'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
      setNewsletterMessage('Please enter your email');
      return;
    }
    setNewsletterMessage('Subscribed successfully! 🎉');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterMessage(''), 3000);
  };

  return (
    <footer className="bg-black text-gray-400">
      <div className="container mx-auto px-4 py-12">
        
        {/* Top Section: Logo and Description */}
        <div className="border-b border-gray-800 pb-8 mb-8">
          <Link href="/">
            <div className="cursor-pointer mb-4">
              <span className="text-3xl font-bold text-green-500">#</span>
              <span className="text-3xl font-bold text-white ml-1">NitSweet</span>
            </div>
          </Link>
          <p className="text-green-500 text-sm mb-2">- Sweet Dishes. Our Sweet Notes.</p>
          <p className="text-gray-500 text-sm max-w-md">
            NitSweet brings you a wide range of 100% sugar free products for a healthier and happier you.
          </p>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Quick Links */}
          <div>
            <h3 className="text-white font-medium text-md mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-500 hover:text-green-500 transition text-sm">Home</Link></li>
              <li><Link href="/shop" className="text-gray-500 hover:text-green-500 transition text-sm">Shop</Link></li>
              <li><Link href="/categories" className="text-gray-500 hover:text-green-500 transition text-sm">Categories</Link></li>
              <li><Link href="/offers" className="text-gray-500 hover:text-green-500 transition text-sm">Offers</Link></li>
              <li><Link href="/about-us" className="text-gray-500 hover:text-green-500 transition text-sm">About Us</Link></li>
              <li><Link href="/contact-us" className="text-gray-500 hover:text-green-500 transition text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h3 className="text-white font-medium text-md mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/my-account" className="text-gray-500 hover:text-green-500 transition text-sm">My Account</Link></li>
              <li><Link href="/orders" className="text-gray-500 hover:text-green-500 transition text-sm">Orders</Link></li>
              <li><Link href="/wishlist" className="text-gray-500 hover:text-green-500 transition text-sm">Wishlist</Link></li>
              <li><Link href="/returns-refunds" className="text-gray-500 hover:text-green-500 transition text-sm">Returns & Refunds</Link></li>
              <li><Link href="/shipping-policy" className="text-gray-500 hover:text-green-500 transition text-sm">Shipping Policy</Link></li>
              <li><Link href="/faq" className="text-gray-500 hover:text-green-500 transition text-sm">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 3: Help & Support */}
          <div>
            <h3 className="text-white font-medium text-md mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-gray-500 hover:text-green-500 transition text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms-conditions" className="text-gray-500 hover:text-green-500 transition text-sm">Terms & Conditions</Link></li>
              <li><Link href="/blog" className="text-gray-500 hover:text-green-500 transition text-sm">Blog</Link></li>
              <li><Link href="/track-order" className="text-gray-500 hover:text-green-500 transition text-sm">Track Order</Link></li>
              <li><Link href="/partner-with-us" className="text-gray-500 hover:text-green-500 transition text-sm">Partner With Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-medium text-md mb-4">Newsletter</h3>
            <p className="text-gray-500 text-sm mb-4">
              Subscribe to get updates on offers and new products.
            </p>
            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="px-4 py-2 bg-transparent border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:border-green-500 placeholder-gray-600"
              />
              <button 
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm font-medium"
              >
                Subscribe
              </button>
              {newsletterMessage && (
                <p className={`text-xs ${newsletterMessage.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                  {newsletterMessage}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Section: Payment Methods and Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Payment Methods */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-500 text-sm">We accept:</span>
              <span className="text-white text-sm bg-transparent">Visa</span>
              <span className="text-gray-600">|</span>
              <span className="text-white text-sm bg-transparent">Mastercard</span>
            </div>
            
            {/* Copyright */}
            <p className="text-gray-600 text-sm">
              © {currentYear} NitSweet. All rights reserved.
            </p>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Star, Truck, Shield, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Hero Section with Auto-Sliding Banners
function Hero() {
  const banners = [
    {
      id: 1,
      image: "/images/banner1.jpg",
      title: "Live Healthy, Shop Smart",
      subtitle: "Choose Health, Choose NilSweet",
      description: "Your one-stop shop for 100% sugar free products.",
      buttonText: "Shop Now →",
      buttonLink: "/products",
      bgGradient: "from-green-50 to-teal-50"
    },
    {
      id: 2,
      image: "/images/banner2.jpg",
      title: "Sugar Free Delights",
      subtitle: "Taste the Natural Goodness",
      description: "Delicious treats without the guilt.",
      buttonText: "Explore Now →",
      buttonLink: "/products",
      bgGradient: "from-amber-50 to-orange-50"
    },
    {
      id: 3,
      image: "/images/banner3.jpg",
      title: "Healthy Snacking",
      subtitle: "Anytime, Anywhere",
      description: "Perfect snacks for your healthy lifestyle.",
      buttonText: "Shop Collection →",
      buttonLink: "/categories",
      bgGradient: "from-blue-50 to-cyan-50"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting and window resize
  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Calculate transform value only on client side
  const getTransformValue = () => {
    if (!isMounted) return 0;
    const slideWidth = windowWidth < 768 ? 101.5 : 102.5;
    return -(currentSlide * slideWidth);
  };

  return (
    <div className="relative overflow-hidden px-4 md:px-6 lg:px-8 my-4">
      <div 
        className="flex transition-transform duration-500 ease-out gap-4 md:gap-6"
        style={{ transform: `translateX(${getTransformValue()}%)` }}
      >
        {banners.map((banner) => (
          <div 
            key={banner.id} 
            className={`w-full flex-shrink-0 bg-gradient-to-r ${banner.bgGradient} rounded-xl shadow-md overflow-hidden`}
          >
            <div className="container mx-auto px-4 py-12 md:py-20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="px-2">
                  <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                    {banner.title}
                  </h1>
                  <p className="text-lg md:text-xl text-green-600 font-semibold mb-4">{banner.subtitle}</p>
                  <p className="text-gray-600 mb-6 md:mb-8">{banner.description}</p>
                  <Link href={banner.buttonLink}>
                    <button className="bg-green-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-green-700 transition">
                      {banner.buttonText}
                    </button>
                  </Link>
                </div>
                <div className="flex justify-center px-2">
                  <img 
                    src={banner.image} 
                    alt={banner.title}
                    className="w-full max-w-md h-auto object-contain rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x400?text=Product+Image";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition z-10"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition z-10"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'w-6 bg-green-600' 
                : 'w-2 bg-gray-400 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Search Bar
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search sugar free products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

// Categories Section
function Categories() {
  const categories = [
    { name: 'Sweets', icon: '🍬', image: '/images/categories/sweets.jpg' },
    { name: 'Snacks & Cookies', icon: '🍪', image: '/images/categories/snacks.jpg' },
    { name: 'Beverages', icon: '🥤', image: '/images/categories/beverages.jpg' },
    { name: 'Spreads', icon: '🍯', image: '/images/categories/spreads.jpg' },
    { name: 'Bakery', icon: '🥖', image: '/images/categories/bakery.jpg' },
    { name: 'More Categories', icon: '📦', image: '/images/categories/more.jpg' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="text-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition cursor-pointer group">
            <div className="relative w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden bg-gray-200">
              <img 
                src={cat.image} 
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<div class="text-3xl">${cat.icon}</div>`;
                }}
              />
            </div>
            <p className="font-medium text-sm mt-2">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Banner Image Section (New - with spacing on all sides)
function PromoBanner() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 my-8 md:my-12">
      <div className="relative rounded-xl overflow-hidden shadow-lg group">
        <img 
          src="/images/promo-banner.jpg" 
          alt="Special Promo Banner"
          className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-cover group-hover:scale-105 transition duration-500"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/1200x400?text=Special+Offer+Banner";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
          <div className="text-white px-6 md:px-12 lg:px-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Special Festival Offer</h3>
            <p className="text-base sm:text-lg md:text-xl mb-3 md:mb-4">Get up to 40% off on all sugar free products</p>
            <p className="text-sm sm:text-base md:text-lg text-yellow-300 mb-4 md:mb-6">Use Code: <span className="font-bold">FESTIVAL40</span></p>
            <button className="bg-green-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-lg hover:bg-green-700 transition text-sm md:text-base">
              Shop Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Second Banner Image (Grid Layout)
function GridBanners() {
  const banners = [
    {
      id: 1,
      image: "/images/grid-banner-1.jpg",
      title: "Sugar Free Sweets",
      discount: "20% OFF",
      link: "/products",
      bgOverlay: "from-black/60 to-transparent"
    },
    {
      id: 2,
      image: "/images/grid-banner-2.jpg",
      title: "Healthy Snacks",
      discount: "Buy 1 Get 1",
      link: "/products",
      bgOverlay: "from-black/60 to-transparent"
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 my-8 md:my-12">
      <div className="grid md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <Link href={banner.link} key={banner.id}>
            <div className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer h-48 sm:h-56 md:h-64">
              <img 
                src={banner.image} 
                alt={banner.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x400?text=Banner+Image";
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgOverlay} flex flex-col justify-center`}>
                <div className="text-white px-6 md:px-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-1">{banner.title}</h3>
                  <p className="text-lg md:text-xl font-semibold text-yellow-300 mb-3">{banner.discount}</p>
                  <button className="bg-green-600 text-white px-4 md:px-5 py-1.5 rounded-lg hover:bg-green-700 transition text-sm">
                    Shop Now →
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Featured Products
function FeaturedProducts() {
  const products = [
    { id: 1, name: 'Nilsweet Stevia Natural Sweetener', price: 249, oldPrice: 299, image: '/images/products/stevia.jpg' },
    { id: 2, name: 'Nilsweet Peanut Butter Creamy', price: 349, oldPrice: 399, image: '/images/products/peanut-butter.jpg' },
    { id: 3, name: 'Nilsweet Almond Cookies Sugar Free', price: 199, oldPrice: 249, image: '/images/products/almond-cookies.jpg' },
    { id: 4, name: 'Nilsweet Choco Spread', price: 199, oldPrice: 249, image: '/images/products/choco-spread.jpg' },
    { id: 5, name: 'Nilsweet Herbal Green Tea Sugar Free', price: 149, oldPrice: 199, image: '/images/products/green-tea.jpg' },
    { id: 6, name: 'Nilsweet Sugar Free', price: 149, oldPrice: 199, image: '/images/products/sugar-free.jpg' },
  ];

  const [showToast, setShowToast] = useState(false);
  const [lastProduct, setLastProduct] = useState('');

  const addToCart = (product) => {
    setLastProduct(product.name);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <Link href={`/products/${product.id}`}>
              <div className="h-48 bg-gray-100 flex items-center justify-center cursor-pointer">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=Product";
                  }}
                />
              </div>
            </Link>
            <div className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold text-gray-800 mb-2 hover:text-green-600 cursor-pointer line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                <span className="text-sm text-gray-400 line-through">₹{product.oldPrice}</span>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm flex items-center justify-center gap-2"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Added {lastProduct} to cart!
        </div>
      )}
    </div>
  );
}

// Features Section
function Features() {
  const features = [
    { icon: Leaf, title: '100% Sugar Free', desc: 'Healthy choices for a better you.' },
    { icon: Shield, title: 'Natural & Safe', desc: 'Made with care, for your health.' },
    { icon: Star, title: 'Trusted Quality', desc: 'Quality you can trust, always.' },
    { icon: Truck, title: 'Fast & Safe Delivery', desc: 'Delivering health to your door.' },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center p-6">
              <feature.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Offer Banner (Coupon)
function OfferBanner() {
  return (
    <div className="bg-gradient-to-r from-green-600 to-teal-600 py-12 my-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          New to Nilsweet?
        </h2>
        <p className="text-green-100 mb-6 text-lg">Get 10% off on your first order</p>
        <div className="inline-block bg-white rounded-lg px-6 py-3">
          <span className="text-green-600 font-bold">Use Code: </span>
          <span className="text-gray-800 font-mono font-bold">NILSWEET10</span>
        </div>
      </div>
    </div>
  );
}

// Main Homepage
export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <SearchBar />
      <Categories />
      <PromoBanner />
      <GridBanners />
      <FeaturedProducts />
      <Features />
      <OfferBanner />
      <Footer />
    </div>
  );
}
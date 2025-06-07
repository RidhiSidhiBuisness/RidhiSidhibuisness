import React from 'react';
import { ShoppingBag, Search, Menu, Heart, User, Home } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { PageType } from '../types';

interface HeaderProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  onMenuClick: () => void;
  onSearchClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange, onMenuClick, onSearchClick }) => {
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();

  const navigationItems = [
    { id: 'home' as PageType, label: 'Home', icon: Home },
    { id: 'new-arrivals' as PageType, label: 'New Arrivals' },
    { id: 'ethnic' as PageType, label: 'Ethnic Wear' },
    { id: 'western' as PageType, label: 'Western Wear' },
    { id: 'party' as PageType, label: 'Party Wear' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-rose-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Mobile menu button */}
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer"
            onClick={() => onPageChange('home')}
          >
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Ridhi Sidhi
            </h1>
            <p className="text-xs md:text-sm text-gray-500 font-medium -mt-1">
              Garment Collection
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-1 font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-rose-600 border-b-2 border-rose-600 pb-1'
                      : 'text-gray-700 hover:text-rose-600'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onSearchClick}
              className="p-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            
            <button 
              onClick={() => onPageChange('wishlist')}
              className="relative p-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
            >
              <Heart className={`h-5 w-5 ${currentPage === 'wishlist' ? 'fill-rose-600 text-rose-600' : ''}`} />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getWishlistCount()}
                </span>
              )}
            </button>
            
            <button className="hidden md:block p-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors">
              <User className="h-5 w-5" />
            </button>
            
            <button 
              onClick={() => onPageChange('cart')}
              className="relative p-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
            >
              <ShoppingBag className={`h-5 w-5 ${currentPage === 'cart' ? 'fill-rose-600 text-rose-600' : ''}`} />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React, { useMemo } from 'react';
import { Product, PageType } from '../types';
import ProductCard from './ProductCard';

interface HomePageProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onPageChange: (page: PageType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, onProductClick, onPageChange }) => {
  const featuredProducts = products.filter(product => product.featured);
  const newArrivals = useMemo(() => 
    products.sort((a, b) => parseInt(b.id) - parseInt(a.id)).slice(0, 8),
    [products]
  );

  const categoryCards = [
    {
      id: 'ethnic' as PageType,
      title: 'Ethnic Wear',
      description: 'Traditional elegance',
      image: 'https://images.pexels.com/photos/8838882/pexels-photo-8838882.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-rose-500 to-pink-500'
    },
    {
      id: 'western' as PageType,
      title: 'Western Wear',
      description: 'Modern fashion',
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'party' as PageType,
      title: 'Party Wear',
      description: 'Glamorous outfits',
      image: 'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-rose-50 to-pink-50 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Discover Your Perfect Style
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Elegant collection of women's fashion for every occasion. From traditional ethnic wear to contemporary western styles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onPageChange('new-arrivals')}
              className="bg-rose-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-rose-700 transition-colors"
            >
              Shop New Arrivals
            </button>
            <button
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-rose-600 text-rose-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-rose-600 hover:text-white transition-colors"
            >
              Explore Categories
            </button>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div id="categories" className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Shop by Category</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {categoryCards.map((category) => (
            <div
              key={category.id}
              onClick={() => onPageChange(category.id)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="aspect-[4/5] relative">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-70 transition-opacity`} />
                <div className="absolute inset-0 flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-3xl font-bold mb-2">{category.title}</h3>
                    <p className="text-lg opacity-90">{category.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-20 bg-white">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Collection</h2>
            <p className="text-xl text-gray-600">Handpicked favorites from our latest collection</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onProductClick(product)}
              />
            ))}
          </div>
        </div>
      )}

      {/* New Arrivals */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h2>
            <p className="text-xl text-gray-600">Fresh styles just added to our collection</p>
          </div>
          <button
            onClick={() => onPageChange('new-arrivals')}
            className="text-rose-600 hover:text-rose-700 font-semibold text-lg"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-4">Stay in Style</h2>
          <p className="text-xl text-rose-100 mb-8">
            Subscribe to get updates on new arrivals, exclusive offers, and fashion tips
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-rose-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
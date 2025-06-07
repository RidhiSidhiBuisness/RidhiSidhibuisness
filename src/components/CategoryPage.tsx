import React, { useState, useMemo } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { Product, PageType } from '../types';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';

interface CategoryPageProps {
  pageType: PageType;
  products: Product[];
  onProductClick: (product: Product) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ pageType, products, onProductClick }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getPageTitle = () => {
    switch (pageType) {
      case 'new-arrivals':
        return 'New Arrivals';
      case 'ethnic':
        return 'Ethnic Wear';
      case 'western':
        return 'Western Wear';
      case 'party':
        return 'Party Wear';
      default:
        return 'Products';
    }
  };

  const getPageDescription = () => {
    switch (pageType) {
      case 'new-arrivals':
        return 'Discover the latest trends in women\'s fashion';
      case 'ethnic':
        return 'Traditional elegance meets contemporary style';
      case 'western':
        return 'Modern fashion for the contemporary woman';
      case 'party':
        return 'Glamorous outfits for special occasions';
      default:
        return 'Explore our collection';
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by page type
    if (pageType === 'new-arrivals') {
      // Show newest products (assuming higher IDs are newer)
      filtered = products.sort((a, b) => parseInt(b.id) - parseInt(a.id)).slice(0, 20);
    } else if (pageType !== 'home') {
      filtered = products.filter(product => product.category === pageType);
    }

    // Apply additional filters
    filtered = filtered.filter(product => {
      const categoryMatch = !selectedCategory || product.category === selectedCategory;
      const subcategoryMatch = !selectedSubcategory || product.subcategory === selectedSubcategory;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return categoryMatch && subcategoryMatch && priceMatch;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [products, pageType, selectedCategory, selectedSubcategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-rose-50 to-pink-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {getPageDescription()}
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block w-80 flex-shrink-0">
            <FilterSidebar
              isOpen={true}
              onClose={() => {}}
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategory}
              onSubcategoryChange={setSelectedSubcategory}
              onPriceRangeChange={setPriceRange}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="md:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredProducts.length} Products
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-rose-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-rose-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500 mb-4">No products found</p>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedSubcategory('');
                    setPriceRange([0, Infinity]);
                  }}
                  className="text-rose-600 hover:text-rose-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => onProductClick(product)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        priceRange={priceRange}
        onCategoryChange={setSelectedCategory}
        onSubcategoryChange={setSelectedSubcategory}
        onPriceRangeChange={setPriceRange}
      />
    </div>
  );
};

export default CategoryPage;
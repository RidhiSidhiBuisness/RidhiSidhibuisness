import React from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { categories } from '../data/products';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  selectedSubcategory: string;
  priceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategory: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  selectedSubcategory,
  priceRange,
  onCategoryChange,
  onSubcategoryChange,
  onPriceRangeChange
}) => {
  const [expandedCategory, setExpandedCategory] = React.useState<string>('');

  const priceRanges = [
    { label: 'Under ₹1,000', min: 0, max: 1000 },
    { label: '₹1,000 - ₹3,000', min: 1000, max: 3000 },
    { label: '₹3,000 - ₹5,000', min: 3000, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: 'Above ₹10,000', min: 10000, max: Infinity }
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } md:relative md:translate-x-0 md:shadow-none md:border-r md:border-gray-200`}>
      
      <div className="p-6 border-b border-gray-200 md:hidden">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto">
        {/* Categories */}
        <div>
          <h3 className="text-lg font-medium mb-4">Categories</h3>
          <div className="space-y-2">
            <button
              onClick={() => {
                onCategoryChange('');
                onSubcategoryChange('');
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === '' ? 'bg-rose-100 text-rose-600' : 'hover:bg-gray-100'
              }`}
            >
              All Categories
            </button>
            
            {categories.map((category) => (
              <div key={category.id}>
                <button
                  onClick={() => {
                    if (expandedCategory === category.id) {
                      setExpandedCategory('');
                    } else {
                      setExpandedCategory(category.id);
                      onCategoryChange(category.id);
                    }
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between items-center ${
                    selectedCategory === category.id ? 'bg-rose-100 text-rose-600' : 'hover:bg-gray-100'
                  }`}
                >
                  <span>{category.name}</span>
                  {expandedCategory === category.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                
                {expandedCategory === category.id && (
                  <div className="ml-4 mt-2 space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <button
                        key={subcategory}
                        onClick={() => onSubcategoryChange(subcategory)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                          selectedSubcategory === subcategory ? 'bg-rose-50 text-rose-600' : 'hover:bg-gray-50'
                        }`}
                      >
                        {subcategory}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-lg font-medium mb-4">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => onPriceRangeChange([range.min, range.max])}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  priceRange[0] === range.min && priceRange[1] === range.max
                    ? 'bg-rose-100 text-rose-600'
                    : 'hover:bg-gray-100'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            onCategoryChange('');
            onSubcategoryChange('');
            onPriceRangeChange([0, Infinity]);
          }}
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
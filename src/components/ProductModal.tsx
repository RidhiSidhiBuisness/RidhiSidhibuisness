import React, { useState } from 'react';
import { X, Heart, Star, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    
    addToCart(product, selectedSize, selectedColor, quantity);
    alert('Product added to cart!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Product Details</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.images[currentImageIndex] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        currentImageIndex === index ? 'border-rose-600' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-gray-600">{product.rating}</span>
                    <span className="ml-1 text-gray-400">({product.reviews} reviews)</span>
                  </div>
                  <button className="flex items-center text-gray-600 hover:text-rose-600 transition-colors">
                    <Heart className="h-5 w-5 mr-1" />
                    Add to Wishlist
                  </button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-medium mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedSize === size
                          ? 'border-rose-600 bg-rose-50 text-rose-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-medium mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedColor === color
                          ? 'border-rose-600 bg-rose-50 text-rose-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-medium mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-rose-600 text-white py-3 px-6 rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>

              {/* Stock Status */}
              <div className="text-sm text-gray-600">
                {product.inStock ? (
                  <span className="text-green-600">✓ In Stock</span>
                ) : (
                  <span className="text-red-600">✗ Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
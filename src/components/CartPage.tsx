import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { PageType } from '../types';

interface CartPageProps {
  onPageChange: (page: PageType) => void;
}

const CartPage: React.FC<CartPageProps> = ({ onPageChange }) => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <button 
            onClick={() => onPageChange('home')}
            className="bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition-colors font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => onPageChange('home')}
            className="flex items-center text-gray-600 hover:text-rose-600 transition-colors mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart ({cartItems.length})</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{item.product.name}</h3>
                    <p className="text-gray-600 mt-1">
                      Size: <span className="font-medium">{item.size}</span> | 
                      Color: <span className="font-medium">{item.color}</span>
                    </p>
                    <p className="text-2xl font-bold text-rose-600 mt-2">₹{item.product.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-semibold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₹{Math.round(getCartTotal() * 0.18).toLocaleString()}</span>
                </div>
                <hr />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-rose-600">₹{Math.round(getCartTotal() * 1.18).toLocaleString()}</span>
                </div>
              </div>
              
              <button className="w-full bg-rose-600 text-white py-4 rounded-lg hover:bg-rose-700 transition-colors font-semibold text-lg mb-4">
                Proceed to Checkout
              </button>
              
              <button
                onClick={clearCart}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
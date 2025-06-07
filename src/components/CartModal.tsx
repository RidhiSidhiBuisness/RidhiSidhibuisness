import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Shopping Cart ({cartItems.length})</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p className="text-lg mb-4">Your cart is empty</p>
              <button 
                onClick={onClose}
                className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="text-lg font-semibold text-rose-600">₹{item.product.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total: ₹{getCartTotal().toLocaleString()}</span>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={clearCart}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Cart
              </button>
              <button className="flex-1 bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition-colors">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
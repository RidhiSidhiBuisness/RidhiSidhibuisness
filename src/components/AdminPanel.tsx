import React, { useState } from 'react';
import { X, Plus, Edit, Trash2, Save, LogOut, Shield } from 'lucide-react';
import { Product } from '../types';
import { categories } from '../data/products';
import { useAuth } from '../hooks/useAuth';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (id: string, product: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}) => {
  const { isAdmin, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'add'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    originalPrice: 0,
    image: '',
    images: [],
    category: '',
    subcategory: '',
    description: '',
    sizes: [],
    colors: [],
    inStock: true,
    featured: false,
    rating: 5,
    reviews: 0
  });

  // Don't render if not admin
  if (!isAdmin) {
    return null;
  }

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      originalPrice: 0,
      image: '',
      images: [],
      category: '',
      subcategory: '',
      description: '',
      sizes: [],
      colors: [],
      inStock: true,
      featured: false,
      rating: 5,
      reviews: 0
    });
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, formData);
    } else {
      onAddProduct({
        ...formData,
        images: formData.image ? [formData.image] : []
      } as Omit<Product, 'id'>);
    }
    
    resetForm();
    setActiveTab('products');
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setActiveTab('add');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      onDeleteProduct(id);
    }
  };

  const handleArrayInput = (field: 'sizes' | 'colors', value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: array }));
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="border-b px-6 py-4 flex justify-between items-center bg-gradient-to-r from-rose-600 to-pink-600 text-white">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6" />
            <div>
              <h2 className="text-xl font-semibold">Admin Panel</h2>
              <p className="text-sm opacity-90">Welcome, {user?.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'products' 
                ? 'text-rose-600 border-b-2 border-rose-600 bg-rose-50' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('add');
              resetForm();
            }}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'add' 
                ? 'text-rose-600 border-b-2 border-rose-600 bg-rose-50' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {editingProduct ? 'Edit Product' : 'Add Product'}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'products' ? (
            <div className="space-y-4">
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg mb-4">No products found</p>
                  <button
                    onClick={() => setActiveTab('add')}
                    className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors"
                  >
                    Add Your First Product
                  </button>
                </div>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4 flex items-center space-x-4 hover:shadow-md transition-shadow">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.category} - {product.subcategory}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-lg font-semibold text-rose-600">₹{product.price.toLocaleString()}</p>
                        {product.featured && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Featured</span>
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <p className="text-gray-600 mt-2">
                  {editingProduct ? 'Update product information' : 'Fill in the details to add a new product'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value, subcategory: '' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory *
                  </label>
                  <select
                    value={formData.subcategory || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                    disabled={!formData.category}
                  >
                    <option value="">Select Subcategory</option>
                    {formData.category && categories.find(cat => cat.id === formData.category)?.subcategories.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating || 5}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sizes (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.sizes?.join(', ') || ''}
                    onChange={(e) => handleArrayInput('sizes', e.target.value)}
                    placeholder="S, M, L, XL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Colors (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.colors?.join(', ') || ''}
                    onChange={(e) => handleArrayInput('colors', e.target.value)}
                    placeholder="Red, Blue, Green"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.inStock || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">In Stock</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Featured Product</span>
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-rose-600 text-white py-3 px-6 rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>{editingProduct ? 'Update Product' : 'Add Product'}</span>
                </button>
                
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
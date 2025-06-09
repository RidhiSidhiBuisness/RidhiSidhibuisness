import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import CartPage from './components/CartPage';
import WishlistPage from './components/WishlistPage';
import ProductModal from './components/ProductModal';
import SearchModal from './components/SearchModal';
import AdminPanel from './components/AdminPanel';
import LoginModal from './components/LoginModal';
import { useProducts } from './hooks/useProducts';
import { useAuth } from './hooks/useAuth';

function App() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsAdminPanelOpen(true);
  };

  const handleLoginClick = () => {
    if (isAdmin) {
      setIsAdminPanelOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            products={products}
            onProductClick={handleProductClick}
            onPageChange={setCurrentPage}
          />
        );
      case 'cart':
        return <CartPage onPageChange={setCurrentPage} />;
      case 'wishlist':
        return (
          <WishlistPage
            onPageChange={setCurrentPage}
            onProductClick={handleProductClick}
          />
        );
      case 'new-arrivals':
      case 'ethnic':
      case 'western':
      case 'party':
        return (
          <CategoryPage
            pageType={currentPage}
            products={products}
            onProductClick={handleProductClick}
          />
        );
      default:
        return (
          <HomePage
            products={products}
            onProductClick={handleProductClick}
            onPageChange={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onMenuClick={() => {}}
        onSearchClick={() => setIsSearchModalOpen(true)}
        onLoginClick={handleLoginClick}
      />

      {renderCurrentPage()}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Ridhi Sidhi</h3>
              <p className="text-gray-300">Your trusted destination for elegant women's fashion</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => setCurrentPage('new-arrivals')} className="hover:text-white transition-colors">New Arrivals</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => setCurrentPage('ethnic')} className="hover:text-white transition-colors">Ethnic Wear</button></li>
                <li><button onClick={() => setCurrentPage('western')} className="hover:text-white transition-colors">Western Wear</button></li>
                <li><button onClick={() => setCurrentPage('party')} className="hover:text-white transition-colors">Party Wear</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Casual Wear</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Ridhi Sidhi Garment Collection. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        products={products}
        onProductClick={handleProductClick}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        products={products}
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
      />
    </div>
  );
}

export default App;
import { useState, useEffect } from 'react';
import { Product } from '../types';
import { initialProducts } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('ridhi-sidhi-products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('ridhi-sidhi-products', JSON.stringify(initialProducts));
    }
  }, []);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now().toString() };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('ridhi-sidhi-products', JSON.stringify(updatedProducts));
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    const updatedProducts = products.map(p => 
      p.id === id ? { ...p, ...updatedProduct } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('ridhi-sidhi-products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('ridhi-sidhi-products', JSON.stringify(updatedProducts));
  };

  return { products, addProduct, updateProduct, deleteProduct };
};
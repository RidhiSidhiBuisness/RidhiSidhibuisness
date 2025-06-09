export const categories = [
  {
    id: 'ethnic',
    name: 'Ethnic Wear',
    subcategories: ['Sarees', 'Salwar Suits', 'Lehengas', 'Kurtis', 'Indo-Western']
  },
  {
    id: 'western',
    name: 'Western Wear',
    subcategories: ['Dresses', 'Tops', 'Bottoms', 'Jumpsuits', 'Co-ord Sets']
  },
  {
    id: 'party',
    name: 'Party Wear',
    subcategories: ['Evening Gowns', 'Cocktail Dresses', 'Designer Sarees', 'Party Suits']
  },
  {
    id: 'casual',
    name: 'Casual Wear',
    subcategories: ['T-Shirts', 'Casual Dresses', 'Jeans', 'Shorts', 'Casual Tops']
  }
];

export const initialProducts = [
  {
    id: '1',
    name: 'Elegant Silk Saree',
    price: 4999,
    originalPrice: 6999,
    image: 'https://images.pexels.com/photos/8838882/pexels-photo-8838882.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/8838882/pexels-photo-8838882.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'ethnic',
    subcategory: 'Sarees',
    description: 'Beautiful handwoven silk saree with intricate golden border work. Perfect for festivals and special occasions.',
    sizes: ['Free Size'],
    colors: ['Red', 'Blue', 'Green'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 156
  },
  {
    id: '2',
    name: 'Designer Anarkali Suit',
    price: 3499,
    originalPrice: 4999,
    image: 'https://images.pexels.com/photos/9558297/pexels-photo-9558297.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/9558297/pexels-photo-9558297.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'ethnic',
    subcategory: 'Salwar Suits',
    description: 'Stunning Anarkali suit with heavy embroidery work and comfortable fit.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pink', 'Yellow', 'White'],
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: '3',
    name: 'Floral Summer Dress',
    price: 1999,
    originalPrice: 2999,
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'western',
    subcategory: 'Dresses',
    description: 'Light and breezy floral dress perfect for summer outings.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral Blue', 'Floral Pink'],
    inStock: true,
    featured: false,
    rating: 4.4,
    reviews: 67
  },
  {
    id: '4',
    name: 'Heavy Lehenga Choli',
    price: 8999,
    originalPrice: 12999,
    image: 'https://images.pexels.com/photos/8502777/pexels-photo-8502777.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/8502777/pexels-photo-8502777.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'party',
    subcategory: 'Designer Sarees',
    description: 'Gorgeous heavy lehenga with intricate zardozi work, perfect for weddings.',
    sizes: ['S', 'M', 'L'],
    colors: ['Red', 'Maroon', 'Golden'],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 234
  },
  {
    id: '5',
    name: 'Cotton Kurti Set',
    price: 1299,
    originalPrice: 1899,
    image: 'https://images.pexels.com/photos/9558283/pexels-photo-9558283.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/9558283/pexels-photo-9558283.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'casual',
    subcategory: 'Casual Tops',
    description: 'Comfortable cotton kurti with palazzo pants, perfect for daily wear.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Peach'],
    inStock: true,
    featured: false,
    rating: 4.3,
    reviews: 45
  },
  {
    id: '6',
    name: 'Evening Gown',
    price: 5999,
    originalPrice: 8999,
    image: 'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'party',
    subcategory: 'Evening Gowns',
    description: 'Elegant floor-length evening gown with beaded detailing.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Navy Blue', 'Wine'],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 123
  }
];
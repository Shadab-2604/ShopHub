const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'iPhone 14 Pro',
    description: 'Latest Apple iPhone with Pro camera system and A16 Bionic chip',
    price: 999,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
    stock: 50,
    rating: 4.8,
    numReviews: 245
  },
  {
    name: 'MacBook Air M2',
    description: 'Lightweight laptop with M2 chip and all-day battery life',
    price: 1199,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    stock: 30,
    rating: 4.9,
    numReviews: 189
  },
  {
    name: 'Nike Air Jordan',
    description: 'Classic basketball shoes with premium leather construction',
    price: 179,
    category: 'Clothing',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    stock: 75,
    rating: 4.7,
    numReviews: 156
  },
  {
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling headphones with 30-hour battery life',
    price: 299,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    stock: 45,
    rating: 4.6,
    numReviews: 98
  },
  {
    name: 'The Great Gatsby',
    description: 'Classic American novel by F. Scott Fitzgerald',
    price: 12.99,
    category: 'Books',
    image: 'https://images.pexels.com/photos/1166657/pexels-photo-1166657.jpeg',
    stock: 100,
    rating: 4.5,
    numReviews: 67
  },
  {
    name: 'Gaming Chair',
    description: 'Ergonomic gaming chair with lumbar support and RGB lighting',
    price: 249,
    category: 'Home & Garden',
    image: 'https://images.pexels.com/photos/4050415/pexels-photo-4050415.jpeg',
    stock: 25,
    rating: 4.4,
    numReviews: 123
  },
  {
    name: 'Yoga Mat',
    description: 'Premium non-slip yoga mat for all types of exercise',
    price: 39.99,
    category: 'Sports',
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg',
    stock: 80,
    rating: 4.3,
    numReviews: 45
  },
  {
    name: 'LEGO Architecture Set',
    description: 'Build famous landmarks with this detailed LEGO set',
    price: 89.99,
    category: 'Toys',
    image: 'https://images.pexels.com/photos/1292260/pexels-photo-1292260.jpeg',
    stock: 35,
    rating: 4.8,
    numReviews: 78
  },
  {
    name: 'Skincare Set',
    description: 'Complete skincare routine with cleanser, serum, and moisturizer',
    price: 79.99,
    category: 'Beauty',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg',
    stock: 60,
    rating: 4.6,
    numReviews: 134
  },
  {
    name: 'Car Phone Mount',
    description: 'Universal smartphone holder for dashboard or windshield',
    price: 24.99,
    category: 'Automotive',
    image: 'https://images.pexels.com/photos/1028742/pexels-photo-1028742.jpeg',
    stock: 95,
    rating: 4.2,
    numReviews: 87
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Sample products added successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
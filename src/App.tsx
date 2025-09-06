import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import AuthPage from './components/AuthPage';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [currentView, setCurrentView] = useState<'auth' | 'products' | 'cart'>('products');

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header currentView={currentView} setCurrentView={setCurrentView} />
          
          {currentView === 'auth' && (
            <AuthPage setCurrentView={setCurrentView} />
          )}
          
          {currentView === 'products' && (
            <ProductList />
          )}
          
          {currentView === 'cart' && (
            <Cart setCurrentView={setCurrentView} />
          )}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
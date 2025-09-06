import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  numReviews: number;
}

interface CartItem {
  product: Product;
  quantity: number;
  _id?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
  isLoading: boolean;
  syncCartWithServer: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:5000/api`;

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, token } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync cart with server when user logs in
  useEffect(() => {
    if (user && token) {
      syncCartWithServer();
    }
  }, [user, token]);

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  });

  const syncCartWithServer = async (): Promise<void> => {
    if (!user || !token) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/cart`, {
        headers: getAuthHeaders(),
      });

      const data = await response.json();
      if (data.success) {
        setCartItems(data.data || []);
      }
    } catch (error) {
      console.error('Error syncing cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product, quantity: number = 1): Promise<void> => {
    try {
      setIsLoading(true);

      if (user && token) {
        // User is logged in, sync with server
        const response = await fetch(`${API_BASE_URL}/cart/add`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ productId: product._id, quantity }),
        });

        const data = await response.json();
        if (data.success) {
          setCartItems(data.data || []);
        } else {
          throw new Error(data.message);
        }
      } else {
        // User not logged in, store in localStorage
        setCartItems(prevItems => {
          const existingItemIndex = prevItems.findIndex(
            item => item.product._id === product._id
          );

          if (existingItemIndex > -1) {
            const newItems = [...prevItems];
            newItems[existingItemIndex].quantity += quantity;
            return newItems;
          } else {
            return [...prevItems, { product, quantity }];
          }
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string): Promise<void> => {
    try {
      setIsLoading(true);

      if (user && token) {
        // User is logged in, sync with server
        const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });

        const data = await response.json();
        if (data.success) {
          setCartItems(data.data || []);
        } else {
          throw new Error(data.message);
        }
      } else {
        // User not logged in, remove from localStorage
        setCartItems(prevItems =>
          prevItems.filter(item => item.product._id !== productId)
        );
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number): Promise<void> => {
    if (quantity < 1) return;

    try {
      setIsLoading(true);

      if (user && token) {
        // User is logged in, sync with server
        const response = await fetch(`${API_BASE_URL}/cart/update`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ productId, quantity }),
        });

        const data = await response.json();
        if (data.success) {
          setCartItems(data.data || []);
        } else {
          throw new Error(data.message);
        }
      } else {
        // User not logged in, update localStorage
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.product._id === productId
              ? { ...item, quantity }
              : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async (): Promise<void> => {
    try {
      setIsLoading(true);

      if (user && token) {
        // User is logged in, sync with server
        const response = await fetch(`${API_BASE_URL}/cart/clear`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });

        const data = await response.json();
        if (data.success) {
          setCartItems([]);
        } else {
          throw new Error(data.message);
        }
      } else {
        // User not logged in, clear localStorage
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getCartCount = (): number => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isLoading,
    syncCartWithServer,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
import { useState, useEffect } from 'react';
import { PizzaItem, CartItem } from '../types/pizza';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: PizzaItem, size: "Entera" | "Media" = "Entera") => {
    const singlePrice = size === "Media" ? Math.round(product.price / 2) : product.price;
    const cartItemId = `${product.id}-${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          id: cartItemId, // identificador único compuesto para evitar colisiones
          quantity: 1,
          size,
          singlePrice,
          price: singlePrice // para retrocompatibilidad
        },
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const total = cart.reduce((acc, item) => acc + item.singlePrice * item.quantity, 0);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const clearCart = () => setCart([]);

  return { cart, addToCart, removeFromCart, updateQuantity, total, itemCount, clearCart, setCart };
};
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('A useCart hook csak CartProvider-en belül használható.');
  }
  return context;
}

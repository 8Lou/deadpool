import { AddedItems } from '../types/types';

type KeyType = 'basket' | 'login';

export const loadCartFromLocalStorage = (key: KeyType): AddedItems[] | undefined => {
  try {
    const serializedCart = localStorage.getItem(key);
    if (serializedCart === null) {
      return undefined;
    }
    return JSON.parse(serializedCart) as AddedItems[];
  } catch (err) {
    return undefined;
  }
};

export const saveCartToLocalStorage = (cart: AddedItems[], key: KeyType) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem(key, serializedCart);
  } catch (err) {
    console.error('Error saving cart to local storage:', err);
  }
};

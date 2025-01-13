export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  getTotalPrice: () => number;
  reduceQuantity: (id: number) => void;
  removeAllFromCart: () => void;
}

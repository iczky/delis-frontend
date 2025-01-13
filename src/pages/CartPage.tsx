// pages/CartPage.tsx
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/components/cart/CartItem";
import { CustomerDetails } from "@/components/cart/CustomerDetails";
import { PaymentMethod } from "@/components/cart/PaymentMethod";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { formatToIDR } from "@/utils/currencyFormatter";
import { ChevronLeft } from "lucide-react";

const CartPage: React.FC = () => {
  const { cart, getTotalPrice, addToCart, reduceQuantity, removeFromCart } =
    useCart();
  const deliveryFee = 10000;
  const totalPrice = getTotalPrice() + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-xl font-bold text-gray-800">Your cart is empty</h1>
        <p className="text-gray-500 mt-2 text-center">
          Add items to your cart to start shopping.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="flex gap-2 items-center sticky top-0 bg-white border-b px-4 py-3 z-10 shadow-sm">
        <button onClick={() => window.history.back()} className="text-blue-500">
          <ChevronLeft />
        </button>
        <h1 className="text-lg font-bold text-gray-800">Cart Summary</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-3">
        {/* Cart Items */}
        <div className="space-y-3">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              addQuantity={addToCart}
              reduceQuantity={reduceQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>

        <CustomerDetails />
        <PaymentMethod />
        <OrderSummary
          subtotal={getTotalPrice()}
          deliveryFee={deliveryFee}
          total={totalPrice}
        />
      </div>

      {/* Bottom Fixed Button */}
      <div className="sticky bottom-0 bg-white border-t p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium
                     active:from-blue-600 active:to-blue-700 transition-all shadow-sm"
          onClick={() => alert("Purchase Confirmed")}>
          Place Order • {formatToIDR(totalPrice)}
        </button>
      </div>
    </div>
  );
};

export default CartPage;

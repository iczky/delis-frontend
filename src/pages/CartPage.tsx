// pages/CartPage.tsx
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/components/cart/CartItem";
import { CustomerDetails } from "@/components/cart/CustomerDetails";
import { PaymentMethod } from "@/components/cart/PaymentMethod";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { formatToIDR } from "@/utils/currencyFormatter";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Customer } from "@/types/customer";
import { generateWhatsAppLink } from "@/utils/BroadcastMessage";
import { Button } from "@/components/ui/button";

const CartPage: React.FC = () => {
  const { cart, getTotalPrice, addToCart, reduceQuantity, removeFromCart } =
    useCart();
  const [customerDetails, setCustomerDetails] = useState<Customer>({
    name: "",
    phone: "",
    address: "",
    deliveryDate: "",
  });

  const deliveryFee = 10000;
  const totalPrice = getTotalPrice() + deliveryFee;

  const handleOrderSubmit = () => {
    // Validate all fields are filled
    if (
      !customerDetails.name ||
      !customerDetails.phone ||
      !customerDetails.address ||
      !customerDetails.deliveryDate
    ) {
      alert("Please fill in all customer details");
      return;
    }

    const whatsAppLink = generateWhatsAppLink({
      cart,
      totalPrice,
      customerDetails,
    });

    window.location.href = whatsAppLink;
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-xl font-bold text-gray-800">Keranjang mu kosong</h1>
        <p className="text-gray-500 mt-2 text-center">
          Tambahkan barang yang diinginkan ke keranjang untuk melakukan order
        </p>
        <Button
          variant={"card"}
          className="w-1/2 mt-4"
          onClick={() => window.history.back()}>
          Kembali ke halaman utama
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-navbar">
      {/* Header */}
      <div className="flex gap-2 items-center sticky top-0 bg-navbar border-b px-4 py-3 z-10 shadow-sm">
        <button onClick={() => window.history.back()} className="text-button">
          <ChevronLeft />
        </button>
        <h1 className="text-lg font-bold text-card">Keranjang</h1>
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

        <CustomerDetails
          customerDetails={customerDetails}
          setCustomerDetails={setCustomerDetails}
        />
        <PaymentMethod />
        <OrderSummary
          subtotal={getTotalPrice()}
          deliveryFee={deliveryFee}
          total={totalPrice}
        />
      </div>

      {/* Bottom Fixed Button */}
      <div className="sticky bottom-0 bg-background border-t p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Button variant={"card"} onClick={handleOrderSubmit}>
          Place Order • {formatToIDR(totalPrice)}
        </Button>
      </div>
    </div>
  );
};

export default CartPage;

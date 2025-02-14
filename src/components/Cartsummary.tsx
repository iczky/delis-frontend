import { Trash2 } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { formatToIDR } from "../utils/currencyFormatter";
import { useNavigate, useLocation } from "react-router";
import { useState } from "react";
import { ConfirmationDialog } from "./ConfirmationDialog";

const CartSummary = () => {
  const { cart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = getTotalPrice();

  const { removeAllFromCart } = useCart();

  const handleRemove = () => {
    setIsDialogOpen(false);
    removeAllFromCart();
  };

  // Hide if cart is empty or we're on the cart page
  if (totalItems === 0 || location.pathname !== "/") return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl mx-auto">
      <div className="bg-button text-white rounded-lg shadow-xl p-4">
        <div className="flex items-center justify-between">
          <div
            className="flex flex-col w-full"
            onClick={() => navigate("/cart")}>
            <span className="text-lg font-medium">{totalItems} barang</span>
            <span className="text-xl font-bold">{formatToIDR(totalPrice)}</span>
          </div>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="absolute top-0 right-0 bg-background text-white rounded-lg w-20 h-full flex items-center justify-center">
            <Trash2 color="#823919" className="h-6 w-6" />
          </button>
        </div>
      </div>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Hapus semua item dari keranjang"
        description="Apakah kamu yakin ingin menghapus semua item dari keranjang?"
        onConfirm={handleRemove}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default CartSummary;

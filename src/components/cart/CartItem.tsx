import { Minus, Plus, X } from "lucide-react";
import { formatToIDR } from "@/utils/currencyFormatter";
import { CartItem as CartItemType } from "../../types/cart";
import { Button } from "../ui/button";
import { useState } from "react";
import { ConfirmationDialog } from "../ConfirmationDialog";

interface CartItemProps {
  item: CartItemType;
  addQuantity: (item: CartItemType) => void;
  reduceQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}

export const CartItem = ({
  item,
  addQuantity,
  reduceQuantity,
  removeFromCart,
}: CartItemProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRemoveItem = (id: number) => {
    setIsDialogOpen(false);
    removeFromCart(id);
  };

  return (
    <div className="bg-card p-3 rounded-lg shadow-sm">
      <div className="flex gap-3">
        {/* Image */}
        <img
          src={`https://placehold.co/100x100`}
          alt={item.name}
          className="w-[100px] h-[100px] object-cover rounded-md"
        />

        {/* Content */}
        <div className="flex-1">
          {/* Title and Price */}
          <div className="flex items-start justify-between mb-2">
            <h2 className="font-medium text-white">{item.name}</h2>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="text-white">
              <X size={18} />
            </button>
          </div>

          {/* Price per item */}
          <p className="text-white text-left text-sm mb-2">
            {formatToIDR(item.price)} / item
          </p>

          {/* Quantity and Total */}
          <div className="flex flex-col-reverse items-start justify-between gap-2">
            <div className="flex items-center gap-4 w-full justify-between">
              <Button variant={"card"} onClick={() => reduceQuantity(item.id)}>
                <Minus size={18} />
              </Button>
              <span className="text-white">{item.quantity}</span>
              <Button variant={"card"} onClick={() => addQuantity(item)}>
                <Plus size={18} />
              </Button>
            </div>
            <p className="font-medium text-white">
              {formatToIDR(item.price * item.quantity)}
            </p>
          </div>
        </div>
      </div>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Remove Item"
        description={`Are you sure you want to remove ${item.name} from your cart?`}
        onConfirm={() => handleRemoveItem(item.id)}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

import { Minus, Plus, X } from "lucide-react";
import { formatToIDR } from "@/utils/currencyFormatter";
import { CartItem as CartItemType } from "../../types/cart";
import { Button } from "../ui/button";

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
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm">
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
            <h2 className="font-medium text-gray-800">{item.name}</h2>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-400">
              <X size={18} />
            </button>
          </div>

          {/* Price per item */}
          <p className="text-gray-600 text-left text-sm mb-2">
            {formatToIDR(item.price)} / item
          </p>

          {/* Quantity and Total */}
          <div className="flex flex-col-reverse items-start justify-between gap-2">
            <div className="flex items-center gap-4 w-full justify-between">
              <Button onClick={() => reduceQuantity(item.id)}>
                <Minus size={18} />
              </Button>
              <span className="text-gray-800">{item.quantity}</span>
              <Button onClick={() => addQuantity(item)}>
                <Plus size={18} />
              </Button>
            </div>
            <p className="font-medium text-gray-800">
              {formatToIDR(item.price * item.quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

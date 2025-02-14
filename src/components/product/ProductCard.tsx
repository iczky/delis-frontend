import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { formatToIDR } from "../../utils/currencyFormatter";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ConfirmationDialog } from "../ConfirmationDialog";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  onAddToCart,
}) => {
  const { cart, addToCart, reduceQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Add state for dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Find if item is in cart and get its quantity
  const cartItem = cart.find((item) => item.id === id);
  const quantity = cartItem?.quantity || 0;

  // Function to handle adding more of the same item
  const handleIncrement = () => {
    addToCart({
      id,
      name,
      price,
      quantity: 1,
    });
  };

  const handleDecrement = (id: number) => {
    reduceQuantity(id);
  };

  // Update remove handler
  const handleRemove = () => {
    setIsDialogOpen(false);
    removeFromCart(id);
  };

  return (
    <div className="bg-card border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div
        className="aspect-w-16 aspect-h-9 relative"
        onClick={() => navigate(`/product/${id}`)}>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 sm:h-40 object-cover"
        />
        {quantity > 0 && (
          <div className="absolute top-2 right-2 bg-card text-white text-xs font-bold py-1 px-2 rounded-full">
            {quantity}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-semibold text-white line-clamp-2">{name}</h2>
          <p className="text-white font-medium">{formatToIDR(price)}</p>
        </div>

        {quantity === 0 ? (
          // Show Add to Cart button if item is not in cart
          <Button
            variant={"card"}
            className="mt-2 text-white text-wrap p-6"
            onClick={onAddToCart}>
            Tambahkan <ShoppingCart className="text-white" />
          </Button>
        ) : (
          // Show quantity controls if item is in cart
          <div className="mt-4 flex flex-col gap-2 rounded-md">
            <div className="grid grid-cols-3 gap-2">
              <Button variant={"card"} onClick={() => handleDecrement(id)}>
                -
              </Button>
              <Button
                className="text-white bg-navbar"
                onClick={() => setIsDialogOpen(true)}>
                <Trash2 color="#823919" />
              </Button>
              <Button variant={"card"} onClick={handleIncrement}>
                +
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Add dialog component before closing div */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleRemove}
        title="Hapus dari Keranjang"
        description="Apakah kamu yakin ingin menghapus item ini dari keranjang?"
      />
    </div>
  );
};

export default ProductCard;

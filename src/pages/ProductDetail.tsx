// pages/ProductDetail.tsx
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useCart } from "@/hooks/useCart";
import { formatToIDR } from "@/utils/currencyFormatter";
import { Button } from "../components/ui/button";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart, reduceQuantity, removeFromCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  // This would come from your API/data source
  const product = {
    id: 1,
    name: "Chocolate Cake",
    price: 20000,
    description:
      "Rich chocolate cake made with premium cocoa powder. Perfect for birthdays and special occasions. Available in various sizes.",
    details: [
      "Available sizes: 15cm, 20cm, 25cm",
      "Serves: 8-10 people",
      "Storage: Keep refrigerated",
      "Best consumed within 3 days",
    ],
    images: [
      "https://placehold.co/800x600",
      "https://placehold.co/800x600",
      "https://placehold.co/800x600",
    ],
  };

  const cartItem = cart.find((item) => item.id === Number(id));
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900">
        <ArrowLeft size={20} />
        Back to Products
      </button>

      {/* Main Image */}
      <div className="mb-4">
        <img
          src={product.images[selectedImage]}
          alt={product.name}
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Thumbnail Images */}
      {product.images.length > 1 && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 ${
                selectedImage === index ? "ring-2 ring-blue-500" : ""
              }`}>
              <img
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            </button>
          ))}
        </div>
      )}

      {/* Product Info */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-xl font-semibold text-blue-600">
          {formatToIDR(product.price)}
        </p>

        <div className="prose max-w-none">
          <p className="text-gray-600">{product.description}</p>

          <div className="mt-4 space-y-2">
            {product.details.map((detail, index) => (
              <p key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                {detail}
              </p>
            ))}
          </div>
        </div>

        {/* Add to Cart Section */}
        <div className="container mx-auto pt-2">
          {quantity === 0 ? (
            <Button
              className="w-full py-6 text-lg"
              onClick={() =>
                addToCart({
                  id: Number(id),
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                })
              }>
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <Button onClick={() => reduceQuantity(Number(id))}>-</Button>
                <span className="text-lg font-medium">{quantity}</span>
                <Button
                  onClick={() =>
                    addToCart({
                      id: Number(id),
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                    })
                  }>
                  +
                </Button>
              </div>
              <Button
                variant="destructive"
                onClick={() => removeFromCart(Number(id))}>
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

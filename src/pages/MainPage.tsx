import ProductCard from "../components/product/ProductCard";
import { useCart } from "../hooks/useCart";

const MainPage = () => {
  const dummyProducts = [
    {
      id: 1,
      name: "Chocolate Cake",
      price: 20000,
      imageUrl: "https://placehold.co/600x400",
    },
    {
      id: 2,
      name: "Vanilla Cupcake",
      price: 50000,
      imageUrl: "https://placehold.co/600x400",
    },
    {
      id: 3,
      name: "Strawberry Tart",
      price: 150000,
      imageUrl: "https://placehold.co/600x400",
    },
    {
      id: 4,
      name: "Strawberry Tart",
      price: 150000,
      imageUrl: "https://placehold.co/600x400",
    },
    {
      id: 5,
      name: "Strawberry Tart",
      price: 150000,
      imageUrl: "https://placehold.co/600x400",
    },
    {
      id: 6,
      name: "Strawberry Tart",
      price: 150000,
      imageUrl: "https://placehold.co/600x400",
    },
  ];

  const { addToCart } = useCart();

  const handleAddCart = (product: {
    id: number;
    name: string;
    price: number;
  }) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Our Products
      </h1>
      <div className="grid grid-cols-2 gap-3">
        {dummyProducts.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={() => handleAddCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;

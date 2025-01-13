import { BrowserRouter as Router, Route, Routes } from "react-router";
import "./App.css";
import MainPage from "./pages/MainPage";
import { CartProvider } from "./context/CartProvider";
import CartPage from "./pages/CartPage";
import CartSummary from "./components/Cartsummary";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
        <CartSummary />
      </CartProvider>
    </Router>
  );
}

export default App;

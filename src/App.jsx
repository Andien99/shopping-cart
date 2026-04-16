import { createContext, useState } from "react";
import { Outlet } from "react-router";
import "./App.css";
import HomePage from "./components/homepage/Homepage";
import { CartContext } from "./components/cart/CartContext";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <CartContext value={{ cart, setCart }}>
      <Outlet />
    </CartContext>
  );
}

export default App;

import DisplayCartItem from "./DisplayCartItem";
import { useCart } from "./CartContext";
const Cart = () => {
  const { cart, setCart } = useCart();
  return (
    <div className="cartContainer">
      cart items
      {cart.map((item) => {
        <DisplayCartItem data={item}></DisplayCartItem>;
      })}
    </div>
  );
};

export default Cart;

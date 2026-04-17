import DisplayCartItem from "./DisplayCartItem";
import { useCart } from "./CartContext";
import { Link } from "react-router";
const Cart = () => {
  const { cart, setCart } = useCart();
  const handleChangeQuantity = () => {};
  return (
    <div
      className="cartContainer"
      style={{ display: "flex", flexDirection: "column", gap: "1em" }}
    >
      {cart.length == 0 ? <h4>There are no cart items to show</h4> : null}
      {cart.map((item) => {
        return (
          <DisplayCartItem
            data={item}
            handleChangeQuantity={handleChangeQuantity}
            key={item.key}
          ></DisplayCartItem>
        );
      })}
      <Link to="../shopping">
        <button>Return to shopping</button>
      </Link>
    </div>
  );
};

export default Cart;

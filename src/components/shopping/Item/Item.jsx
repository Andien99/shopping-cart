import { useEffect, useState } from "react";
import styles from "./item.module.css";
import { useCart } from "../../cart/CartContext";
const Item = ({ title, price, img, id, addToCart }) => {
  const [quantity, setQuantity] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const { cart, setCart } = useCart();

  useEffect(() => {
    const itemIsInCart = cart.find((item) => item.key === id);
    if (itemIsInCart === undefined) return;
    setQuantity(itemIsInCart.quantity);
  }, []);

  const handleIncrement = () => {
    if (quantity >= 0 && disabled) setDisabled(false);
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (disabled) return;
    if (cart.length > 0 && quantity == 1) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].key === id) return setDisabled(true);
      }
    }
    if (quantity > 0) return setQuantity((prev) => prev - 1);
  };

  const handleCart = (title, price, img, quantity, id) => {
    if (quantity == 0) return;
    addToCart(title, price, img, quantity, id);
  };

  return (
    <div className={styles.item} data-testid="item" id={id} key={id}>
      <div className="productInfo">
        <h3>{title}</h3>
        <h4>${price}</h4>
        <img className={styles.productImage} src={img} alt={title} />
      </div>
      <div className={styles.handlePurchase}>
        <div className={styles.quantityBtn}>
          <button
            className={disabled ? styles.decrementdisabled : styles.decrement}
            onClick={handleDecrement}
          >
            -
          </button>
          <p data-testid="quantity">{quantity}</p>
          <button className="increment" onClick={handleIncrement}>
            +
          </button>
        </div>
        <button onClick={() => handleCart(title, price, img, quantity, id)}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Item;

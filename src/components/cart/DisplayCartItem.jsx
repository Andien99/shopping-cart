import styles from "./DisplayCartItem.module.css";
import { useState } from "react";
import { useCart } from "./CartContext";
const DisplayCartItem = ({ data, changeTotal }) => {
  const { cart, setCart } = useCart();
  const [disabled, setDisabled] = useState(false);
  const handleIncrement = () => {
    if (data.quantity >= 0 && disabled) setDisabled(false);
    setCart(
      cart.map((item) => {
        if (item.key === data.key) {
          return { ...item, quantity: data.quantity + 1 };
        } else {
          return item;
        }
      }),
    );
  };

  const handleDecrement = () => {
    if (disabled) return;
    if (cart.length > 0 && data.quantity == 1) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].key === data.key) return setDisabled(true);
      }
    }
    setCart(
      cart.map((item) => {
        if (item.key === data.key) {
          return { ...item, quantity: data.quantity - 1 };
        } else {
          return item;
        }
      }),
    );
  };

  const handleRemoveItem = () => {
    setCart(cart.filter((item) => item.key !== data.key));
  };

  return (
    <div className={styles.item}>
      <img className={styles.itemImage} src={data.img}></img>
      <div className={styles.infoContainer}>
        <h2 className={styles.itemTitle}>{data.title}</h2>
        <h1>$ {data.price}</h1>
        <h3>Subtotal: $ {data.price * data.quantity}</h3>
        <button className={styles.removeBtn} onClick={handleRemoveItem}>
          Remove
        </button>
      </div>
      <div className={styles.quantityBtn}>
        <button
          className={disabled ? styles.decrementdisabled : styles.decrement}
          onClick={handleDecrement}
        >
          -
        </button>
        <p>{data.quantity}</p>
        <button className="increment" onClick={handleIncrement}>
          +
        </button>
      </div>
    </div>
  );
};

export default DisplayCartItem;

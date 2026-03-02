import { useState } from "react";
import styles from "./item.module.css";
const Item = ({ title, price, img }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) setQuantity((prev) => prev - 1);
  };

  return (
    <div className={styles.item}>
      <h3>{title}</h3>
      <h4>{price}</h4>
      <img src={img} alt={title} />
      <div>
        <button className="decrement" onClick={handleDecrement}>
          -
        </button>
        <p>{quantity}</p>
        <button className="increment" onClick={handleIncrement}>
          +
        </button>
      </div>
    </div>
  );
};

export default Item;

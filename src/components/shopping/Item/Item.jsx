import { useState } from "react";
import styles from "./item.module.css";
const Item = ({ title, price, img, id }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) setQuantity((prev) => prev - 1);
  };

  const handleCart = () => {
    console.log("x" + quantity + " " + title + "has been added");
  };

  return (
    <div className={styles.item} data-testid="item">
      <div className="productInfo">
        <h3>{title}</h3>
        <h4>${price}</h4>
        <img className={styles.productImage} src={img} alt={title} />
      </div>
      <div className={styles.handlePurchase}>
        <div className={styles.quantityBtn}>
          <button className="decrement" onClick={handleDecrement}>
            -
          </button>
          <p>{quantity}</p>
          <button className="increment" onClick={handleIncrement}>
            +
          </button>
        </div>
        <button onClick={handleCart}>Add to cart</button>
      </div>
    </div>
  );
};

export default Item;

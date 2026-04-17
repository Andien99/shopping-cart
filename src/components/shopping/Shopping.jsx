import { use, useContext, useEffect, useState } from "react";
import Item from "./Item/Item";
import fetchProduct from "../../hooks/fetchProduct";
import styles from "./Shopping.module.css";
import { Link } from "react-router";
import { useCart } from "../cart/CartContext";

const Shopping = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { cart, setCart } = useCart();

  useEffect(() => {
    async function connect() {
      const result = await fetchProduct();
      if (Array.isArray(result)) {
        setLoading(false);
        setData(result);
      } else {
        setLoading(false);
        setLoading(false);
        setError(true);
      }
    }
    connect();
  }, []);

  const addToCart = (title, price, img, quantity, id) => {
    let item = {
      key: id,
      title: title,
      price: price,
      img: img,
      quantity: quantity,
    };

    let canModifyItem = false;

    let newCart = cart.map((cartItem) => {
      if (cartItem.key === item.key) {
        canModifyItem = true;
        return item;
      } else {
        return cartItem;
      }
    });

    if (canModifyItem == true) {
      setCart(newCart);
      canModifyItem = false;
    } else {
      setCart([...cart, item]);
    }
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <div>
      {error ? (
        <h2 data-testid="error">Error: 404 not found</h2>
      ) : (
        <>
          <h2>Product list</h2>

          <Link to="cart">
            <div className={styles.cartBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z"
                ></path>
              </svg>
              <div className={styles.cartLength}>
                {Object.keys(cart).length} items in cart
              </div>
            </div>
          </Link>
          <div className={styles.shop}>
            {loading && <h3>Loading...</h3>}
            {data.map((item) => (
              <Item
                key={item.id}
                title={item.title}
                price={item.price}
                img={item.image}
                id={item.id}
                addToCart={addToCart}
              ></Item>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Shopping;

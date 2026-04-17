import DisplayCartItem from "./DisplayCartItem";
import { useCart } from "./CartContext";
import { Link } from "react-router";
import styles from "./Cart.module.css";
import { useState } from "react";
const Cart = () => {
  const { cart, setCart } = useCart();
  const handleChangeQuantity = () => {};
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const roundedTotal = Math.round(totalPrice * 100) / 100;
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <>
      {cart.length == 0 ? (
        <h4>There are no cart items to show</h4>
      ) : (
        <>
          <h2>Shopping Cart</h2>
          <div className={styles.cartContainer}>
            <div className={styles.cartItems}>
              {cart.map((item) => {
                return (
                  <DisplayCartItem
                    data={item}
                    handleChangeQuantity={handleChangeQuantity}
                    key={item.key}
                    changeTotal={totalPrice}
                  ></DisplayCartItem>
                );
              })}
            </div>
            <div className={styles.orderSummaryContainer}>
              <div>
                <h4>Order Summary</h4>
                <h4>{totalQuantity} Item(s)</h4>
              </div>
              <div>
                <h4>Item(s) total</h4>
                <h4>${roundedTotal}</h4>
              </div>
              <div>
                <h4>Shipping</h4>
                <h4>TBD</h4>
              </div>
              <div>
                <h3>Order Total</h3>
                <h3>${roundedTotal}</h3>
              </div>
            </div>
          </div>
        </>
      )}
      <Link to="../shopping">
        <button className={styles.returnBtn}>Return to shopping</button>
      </Link>
    </>
  );
};

export default Cart;

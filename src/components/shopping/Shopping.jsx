import { use, useEffect, useState } from "react";
import Item from "./Item/Item";
import fetchProduct from "../../hooks/fetchProduct";
import styles from "./Shopping.module.css";

const Shopping = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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

  console.log(data);
  return (
    <div>
      {error ? (
        <h2 data-testid="error">Error: 404 not found</h2>
      ) : (
        <>
          <h2>Product list</h2>
          <div className={styles.shop}>
            {loading && <h3>Loading...</h3>}
            {data.map((item) => (
              <Item
                title={item.title}
                price={item.price}
                img={item.image}
                key={item.id}
              ></Item>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Shopping;

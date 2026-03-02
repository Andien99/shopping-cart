import { useEffect, useState } from "react";
import Item from "./Item/Item";
import fetchProduct from "../../hooks/fetchProduct";

const Shopping = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function connect() {
      const result = await fetchProduct();
      setData(result);
    }
    connect();
  }, []);

  console.log(data);
  return (
    <div className="shop">
      {data.map((item) => (
        <Item title={item.title} price={item.price} img={item.image}></Item>
      ))}
    </div>
  );
};

export default Shopping;

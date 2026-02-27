import { Link } from "react-router";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Budget Shop!</h1>
      <Link to="shopping">Open Shop</Link>
    </div>
  );
};

export default HomePage;

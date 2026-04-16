import HomePage from "../components/homepage/Homepage";
import Shopping from "../components/shopping/Shopping";
import Cart from "../components/cart/Cart";
import App from "../App";
import ErrorPage from "../components/handleError/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "shopping", element: <Shopping /> },
      { path: "shopping/cart", element: <Cart /> },
    ],
  },
];

export default routes;

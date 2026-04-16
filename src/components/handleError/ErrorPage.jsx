// ErrorPage.jsx
import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError(); // ← grabs the thrown error from React Router

  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorPage;

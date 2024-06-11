import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../module/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

export default router;

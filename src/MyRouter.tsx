import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Create from "./pages/create/Create";
import Dashboard from "./pages/dashboard/Dashboard";
import Landing from "./pages/landing/Landing";
import RequestNFT from "./pages/requestNFT/RequestNFT";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/new-user",
    element: <RequestNFT />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/create",
    element: <Create />,
  },
]);

function MyRouter() {
  return <RouterProvider router={router} />;
}

export default MyRouter;

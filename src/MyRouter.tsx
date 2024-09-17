import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CanInteractRoute from "./components/routing/CanInteractRoute";
import ConnectedRoute from "./components/routing/ConnectedRoute";
import NoAuthRoute from "./components/routing/NoAuthRoute";
import Create from "./pages/create/Create";
import Dashboard from "./pages/dashboard/Dashboard";
import Landing from "./pages/landing/Landing";
import NFTPending from "./pages/NFTPending/NFTPending";
import RequestNFT from "./pages/requestNFT/RequestNFT";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NoAuthRoute>
        <Landing />
      </NoAuthRoute>
    ),
  },
  {
    path: "/new-user",
    element: (
      <ConnectedRoute>
        <RequestNFT />
      </ConnectedRoute>
    ),
  },
  {
    path: "/pending-application",
    element: (
      <ConnectedRoute>
        <NFTPending />
      </ConnectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <CanInteractRoute>
        <Dashboard />
      </CanInteractRoute>
    ),
  },
  {
    path: "/create",
    element: (
      <CanInteractRoute>
        <Create />
      </CanInteractRoute>
    ),
  },
]);

function MyRouter() {
  return <RouterProvider router={router} />;
}

export default MyRouter;

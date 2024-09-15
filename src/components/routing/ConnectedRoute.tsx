import { Navigate } from "react-router-dom";
import { useAccount } from "wagmi";

const ConnectedRoute = ({ children }: { children: JSX.Element }) => {
  const { address } = useAccount();

  if (address === undefined) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ConnectedRoute;

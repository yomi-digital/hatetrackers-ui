import { Navigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useUser } from "../../contexts/userContext/UseUser";

const ConnectedRoute = ({ children }: { children: JSX.Element }) => {
  const { address } = useAccount();
  const user = useUser();

  if (address === undefined || address?.length === 0) {
    return <Navigate to="/" replace />;
  } else if (user.canInteract) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ConnectedRoute;

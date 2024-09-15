import { Navigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useUser } from "../../contexts/userContext/UseUser";

const CanInteractRoute = ({ children }: { children: JSX.Element }) => {
  const { address } = useAccount();
  const user = useUser();

  if (address === undefined) {
    return <Navigate to="/" replace />;
  } else if (user.canInteract !== undefined && !user.canInteract) {
    return <Navigate to="/new-user" replace />;
  }

  return children;
};

export default CanInteractRoute;

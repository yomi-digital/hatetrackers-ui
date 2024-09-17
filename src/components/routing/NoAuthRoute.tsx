import { Navigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useUser } from "../../contexts/userContext/UseUser";

const NoAuthRoute = ({ children }: { children: JSX.Element }) => {
  const { address } = useAccount();
  const user = useUser();

  if (address !== undefined) {
    if (user.canInteract) {
      return <Navigate to="/dashboard" replace />;
    } else if (user.canInteract !== undefined && !user.canInteract) {
      if (user.applicationStatus === "pending") {
        return <Navigate to="/pending-application" replace />;
      } else if (user.applicationStatus === "not_applied") {
        return <Navigate to="/new-user" replace />;
      }
    }
  }

  return children;
};

export default NoAuthRoute;

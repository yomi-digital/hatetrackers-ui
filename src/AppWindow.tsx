import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import ScrollToTop from "./components/ScrollToTop";

function AppWindow({ children }: PropsWithChildren) {
  const { isConnected } = useAccount();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected && location.pathname !== "/") {
      navigate("/");
    }
  }, [isConnected, location]);
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}

export default AppWindow;

import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import HeartImg from "./assets/images/icons/heart.svg";
import ScrollToTop from "./components/ScrollToTop";

function AppWindow({ children }: PropsWithChildren) {
  const { isConnected } = useAccount();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected && location.pathname !== "/") {
      navigate("/");
    }
  }, [isConnected, location, navigate]);
  return (
    <>
      <ScrollToTop />
      {children}
      <div className="pb-2 pl-2 fixed bottom-0 left-0">
        <div className="py-1 px-2 text-black bg-white rounded-lg text-xs">
          <span>
            Made with <img src={HeartImg} alt="Heart" className="inline" /> by{" "}
            <a href="https://yomi.digital" target="_blank">
              YOMI
            </a>
          </span>
        </div>
      </div>
    </>
  );
}

export default AppWindow;

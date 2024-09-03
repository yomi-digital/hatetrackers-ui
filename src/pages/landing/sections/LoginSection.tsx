import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import LogoLongImg from "../../../assets/images/logo_long.svg";
import RadialRedImg from "../../../assets/images/pictures/radial_gradient_red.svg";
import RadialWhiteImg from "../../../assets/images/pictures/radial_gradient_white.svg";
import MyButton from "../../../components/MyButton";
import MyLoader from "../../../components/MyLoader";
function LoginSection() {
  const { open } = useWeb3Modal();
  const { isConnected, isConnecting } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate("/dashboard");
    }
  }, [isConnected, navigate]);

  return (
    <div className="relative h-screen w-full flex justify-center items-center overflow-hidden">
      <div>
        <img src={LogoLongImg} alt="Hate Trackers" />
        {!isConnecting ? (
          <MyLoader rootClassName="mx-auto block mt-10" />
        ) : (
          <MyButton className="mx-auto block mt-10" onClick={open}>
            Connect Wallet
          </MyButton>
        )}
      </div>
      <img
        className="-z-10 absolute -bottom-1/3 -right-1/3 w-[70rem] max-w-[70rem] h-[70rem] max-h-[70rem] object-contain scale-150"
        src={RadialRedImg}
        alt="Radial Gradient"
      />
      <img
        className="-z-10 absolute -top-1/3 -left-1/3 w-[70rem] max-w-[70rem] h-[70rem] max-h-[70rem] object-contain scale-110"
        src={RadialWhiteImg}
        alt="Radial Gradient"
      />
    </div>
  );
}

export default LoginSection;

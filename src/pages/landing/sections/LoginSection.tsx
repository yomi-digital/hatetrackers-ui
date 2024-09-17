import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import LogoLongImg from "../../../assets/images/logo_long.svg";
import BgImage from "../../../assets/images/pictures/bg_horizontal.jpg";
import MyButton from "../../../components/buttons/MyButton";
import MyErrorBox from "../../../components/MyErrorBox";
import MyLoader from "../../../components/MyLoader";
import { useUser } from "../../../contexts/userContext/UseUser";
function LoginSection() {
  const { open } = useWeb3Modal();
  const { address, isConnecting } = useAccount();
  const user = useUser();
  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname == "/" && address) {
  //     if (user.canInteract) {
  //       navigate("/dashboard");
  //     } else {
  //       navigate("/new-user");
  //     }
  //   }
  // }, [user.canInteract]);

  const renderHtml = useMemo(() => {
    if (!address) {
      if (!isConnecting) {
        return (
          <MyButton className="mx-auto block mt-10" onClick={open}>
            Connect Wallet
          </MyButton>
        );
      } else {
        return (
          <MyLoader
            rootClassName="mx-auto block mt-10"
            label="Establishing connection..."
          />
        );
      }
    } else if (user.isUserFetchPending || user.isApplicationFetchPending) {
      return (
        <MyLoader
          rootClassName="mx-auto block mt-10"
          label="Checking user..."
        />
      );
    } else if (user.isUserFetchError || user.isApplicationFetchError) {
      return <MyErrorBox label="Error while fetching user..." />;
    } else {
      return null;
    }
  }, [
    address,
    open,
    user.isUserFetchPending,
    user.isUserFetchError,
    user.isApplicationFetchPending,
    user.isApplicationFetchError,
    isConnecting,
  ]);

  return (
    <div className="relative h-screen w-full flex justify-center items-center overflow-hidden">
      <img
        className="-z-10 absolute top-0 left-0 h-screen w-screen object-cover"
        src={BgImage}
      />
      <div>
        <img src={LogoLongImg} alt="Hate Trackers" />

        {renderHtml}
        {/* {isConnecting ? (
          <MyLoader rootClassName="mx-auto block mt-10" />
        ) : (
          <MyButton className="mx-auto block mt-10" onClick={open}>
            Connect Wallet
          </MyButton>
        )} */}
      </div>

      {/* <div className="-z-10 absolute -bottom-1/2 -right-1/3 w-full aspect-square bg-gradient-radial from-primary/80 from-20% to-transparent to-70%" />
      <div className="-z-10 absolute w-1/2 left-32 aspect-square bg-gradient-radial from-white/30 to-transparent to-70%" /> */}
    </div>
  );
}

export default LoginSection;

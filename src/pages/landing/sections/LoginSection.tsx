import { useQuery } from "@tanstack/react-query";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import axios from "axios";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import LogoLongImg from "../../../assets/images/logo_long.svg";
import BgImage from "../../../assets/images/pictures/bg_horizontal.jpg";
import MyButton from "../../../components/buttons/MyButton";
import MyErrorBox from "../../../components/MyErrorBox";
import MyLoader from "../../../components/MyLoader";
import { CheckUserResponse } from "../../../models/API/check";
function LoginSection() {
  const { open } = useWeb3Modal();
  const { isConnecting, address } = useAccount();
  const navigate = useNavigate();
  const { isSuccess, isError, isPending, data, refetch } =
    useQuery<CheckUserResponse>({
      queryKey: ["check-user"],
      queryFn: () =>
        axios
          .get(import.meta.env.VITE_API_URI + "/check/" + address)
          .then((res) => {
            console.log(res.data);
            return res.data;
          }),
      enabled: address !== undefined,
    });

  useEffect(() => {
    // if (isConnected) {
    //   navigate("/dashboard");
    // }
    if (isSuccess) {
      if (data.canInteract) {
        navigate("/dashboard");
      } else {
        navigate("/new-user");
      }
    }
  }, [isSuccess, data, navigate]);

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
    } else if (isPending) {
      return (
        <MyLoader
          rootClassName="mx-auto block mt-10"
          label="Checking user..."
        />
      );
    } else if (isError || data.error) {
      return (
        <MyErrorBox
          onButtonClick={refetch}
          label="Error while fetching user..."
        />
      );
    } else {
      return null;
    }
  }, [isConnecting, isPending, isError, data, address, open, refetch]);

  return (
    <div className="relative h-screen w-full flex justify-center items-center overflow-hidden">
      <img
        className="-z-10 absolute top-0 bottom-0 left-0 right-0"
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

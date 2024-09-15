import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { CheckUserResponse } from "../../models/API/check";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { address, isConnected } = useAccount();
  const [canInteract, setCanInteract] = useState<boolean>();
  const { isSuccess, data, isPending, isError } = useQuery<CheckUserResponse>({
    queryKey: ["check-user" + address],
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
    console.log("isConnected", isConnected);
    if (!isConnected && canInteract) {
      setCanInteract(undefined);
    }
  }, [isConnected, canInteract]);

  useEffect(() => {
    // if (isConnected) {
    //   navigate("/dashboard");
    // }
    if (isSuccess) {
      if (data.canInteract) {
        setCanInteract(true);
      } else {
        setCanInteract(false);
      }
    }
  }, [isSuccess, data]);

  return (
    <UserContext.Provider
      value={{
        canInteract,
        isPending,
        isError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

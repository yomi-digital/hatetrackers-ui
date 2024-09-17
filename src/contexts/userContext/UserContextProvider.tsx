import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  CheckApplicationResponse,
  CheckUserResponse,
} from "../../models/API/check";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { address, isConnected } = useAccount();
  const [canInteract, setCanInteract] = useState<boolean>();
  const [applicationStatus, setApplicationStatus] = useState<
    "idle" | "not_applied" | "pending" | "accepted"
  >("idle");
  const { isSuccess, data, isPending, isError } = useQuery<CheckUserResponse>({
    queryKey: ["check-user" + address],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URI + "/check/" + address)
        .then((res) => {
          console.log(res.data);
          return res.data;
        }),
    enabled: address !== undefined && address?.length > 0,
  });
  const {
    isSuccess: isSuccessApplication,
    data: dataApplication,
    isPending: isPendingApplication,
    isError: isErrorApplication,
  } = useQuery<CheckApplicationResponse>({
    queryKey: ["check-application" + address],
    queryFn: () =>
      axios
        .post(import.meta.env.VITE_MEGO_API_URI + "/applications/check/", {
          identifier: "0xaF81EBE3e7_445332",
          address: address,
        })
        .then((res) => {
          console.log(res.data);
          return res.data;
        }),
    enabled: canInteract === false,
  });

  useEffect(() => {
    console.log("isConnected", isConnected);
    if (!isConnected) {
      if (canInteract) {
        setCanInteract(undefined);
      }
      if (applicationStatus !== "idle") {
        setApplicationStatus("idle");
      }
    }
  }, [isConnected, canInteract, applicationStatus]);

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
  useEffect(() => {
    // if (isConnected) {
    //   navigate("/dashboard");
    // }
    if (isSuccessApplication && !dataApplication.error) {
      if (dataApplication.applied) {
        if (dataApplication.accepted) {
          setApplicationStatus("accepted");
        } else {
          setApplicationStatus("pending");
        }
      } else {
        setApplicationStatus("not_applied");
      }
    }
  }, [isSuccessApplication, dataApplication]);

  return (
    <UserContext.Provider
      value={{
        canInteract,
        isUserFetchPending: isPending,
        isUserFetchError: isError,
        applicationStatus,
        isApplicationFetchPending: isPendingApplication,
        isApplicationFetchError: isErrorApplication,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

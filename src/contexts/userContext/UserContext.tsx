import { createContext } from "react";

interface UserContextType {
  canInteract?: boolean;
  isUserFetchPending: boolean;
  isUserFetchError: boolean;
  applicationStatus: "idle" | "not_applied" | "pending" | "accepted";
  isApplicationFetchPending: boolean;
  isApplicationFetchError: boolean;
}

export const UserContext = createContext<UserContextType>({
  isUserFetchPending: false,
  isUserFetchError: false,
  applicationStatus: "idle",
  isApplicationFetchPending: false,
  isApplicationFetchError: false,
});

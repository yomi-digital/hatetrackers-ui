import { createContext } from "react";

interface UserContextType {
  canInteract?: boolean;
  isPending: boolean;
  isError: boolean;
}

export const UserContext = createContext<UserContextType>({
  isPending: false,
  isError: false,
});

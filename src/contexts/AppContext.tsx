import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

import { User } from "../types/user";

type AppProviderProps = {
  children: React.ReactNode;
};

type AppStateContextDataProps = {
  registerUser: User | null;
  setRegisterUser: Dispatch<SetStateAction<User | null>>;
};

export const AppStateContext = createContext<AppStateContextDataProps>(
  {} as AppStateContextDataProps
);

export function AppProvider({ children }: AppProviderProps) {
  const [registerUser, setRegisterUser] = useState<User | null>(null);

  const providerValue = useMemo(
    () => ({ registerUser, setRegisterUser }),
    [registerUser]
  );
  return (
    <AppStateContext.Provider value={providerValue}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}

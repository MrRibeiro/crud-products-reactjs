import React, { createContext, useEffect, useMemo, useState } from "react";

import api from "../services/api";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextDataProps = {
  signed: boolean;
  hasError: boolean;
  user: object | null;
  Login({ email, password }: LoginProps): Promise<void>;
  Logout(): void;
};

export type LoginProps = {
  email: string;
  password: string;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthProvider({ children }: AuthProviderProps) {
  // TODO - Criar User Type quando houver uma API com padrão
  const [user, setUser] = useState<object | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [signed, setSigned] = useState<boolean>(false);

  useEffect(() => {
    const storagedUser = localStorage.getItem("@App:user");
    const storagedToken = localStorage.getItem("@App:token");

    if (storagedToken && storagedUser) {
      setSigned(true);
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  async function Login({ email, password }: LoginProps) {
    setHasError(false);
    const response = await api.get("/user", {
      params: {
        email,
        password,
      },
    });

    if (response.data[0] && response.data[0].senha === password) {
      setSigned(true);
      setUser(response.data);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      localStorage.setItem("@App:user", JSON.stringify(response.data[0]));
      localStorage.setItem("@App:token", response.data[0].token);
      return;
    }

    setHasError(true);
  }

  function Logout() {
    setSigned(false);
    setUser(null);

    localStorage.removeItem("@App:user");
    localStorage.removeItem("App:token");
  }

  const providerValue = useMemo(
    () => ({ signed, hasError, user, Login, Logout }),
    [hasError, signed, user]
  );

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}

import React from "react";

import { useAuth } from "../hooks/useAuth";

import AuthenticatedRoutes from "./AuthenticatedRoutes";
import UnauthenticatedRoutes from "./UnauthenticatedRoutes";

const Router = () => {
  const { signed } = useAuth();

  return signed ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
};

export default Router;

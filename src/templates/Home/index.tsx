import React from "react";

import { useAuth } from "../../hooks/useAuth";

const Template = () => {
  const { Logout } = useAuth();
  return (
    <div>
      <h1>Home</h1>
      <button type="button" onClick={Logout}>
        Logout
      </button>
    </div>
  );
};

export default Template;

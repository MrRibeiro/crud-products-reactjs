import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

const UnauthenticatedRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/confirm" element={<Confirm />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default UnauthenticatedRoutes;

import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";

import Register from "../pages/register/Register";
import { Account } from "../pages/account/Account";
function Routers(props) {
  return (
    <Routes>
      <Route path="home" element={<Home />} />{" "}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />{" "}
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default Routers;

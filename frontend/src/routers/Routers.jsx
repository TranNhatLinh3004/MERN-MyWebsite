import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";

import Register from "../pages/register/Register";
import { Account } from "../pages/account/Account";
import ResetPassword from "../pages/login/ResetPassword";
import Shop from "../pages/shop/Shop";
import ProductDetails from "../pages/productDetails/ProductDetails";
function Routers(props) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, []);
  return (
    <Routes>
      <Route path="home" element={<Home />} />{" "}
      <Route path="/shop" element={<Shop />} />{" "}
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="login" element={<Login />} />
      <Route path="forgotPassword" element={<ResetPassword />} />
      <Route path="register" element={<Register />} />{" "}
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default Routers;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Management from "../pages/Management";

import { useSelector } from "react-redux";

const Routers = () => {

  const jwt = useSelector((state) => (state.auth.jwt));

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/foods" element={<AllFoods />} /> */}
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />

      {jwt &&
        <Route path="/management" element={<Management />} />
      }


      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default Routers;

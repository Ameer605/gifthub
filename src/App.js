//import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./js/Login";
import Signup from "./js/Signup";
import Main from "./js/Main";
import Cart from "./js/Cart";
import Orders from "./js/Orders";
import Dashboard from "./js/Dashboard";
import React from "react";
import AdminDashboard from "./js/AdminDashboard";
import AdminPendingOrders from "./js/AdminPendingOrders";
import AdminCompletedOrders from "./js/AdminCompletedOrders";
import AdminSellers from "./js/AdminSellers";
import AdminBuyers from "./js/AdminBuyers";
import AdminReviews from "./js/AdminReviews";
import AdminRatings from "./js/AdminRatings";
import Search from "./js/Search.js";

//import Test from "./js/Test";

function App() {
  return (
    <>
      <Routes>
        {/*<Route path="/" element={<Login />} />*/}
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Admin" element={<AdminDashboard />} />
        <Route path="/PendingOrders" element={<AdminPendingOrders />} />
        <Route path="/completedOrders" element={<AdminCompletedOrders />} />
        <Route path="/sellers" element={<AdminSellers />} />
        <Route path="/buyers" element={<AdminBuyers />} />
        <Route path="/reviews" element={<AdminReviews />} />
        <Route path="/ratings" element={<AdminRatings />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;

import nStyles from "../css/navbar.module.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await fetch("http://localhost:5000/users/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();

    if (data) {
      navigate("/");
    }
  };

  const pendingOrders = () => {
    navigate("/PendingOrders");
  };
  const completedOrders = () => {
    navigate("/completedOrders");
  };
  const sellers = () => {
    navigate("/sellers");
  };
  const buyers = () => {
    navigate("/buyers");
  };
  const reviews = () => {
    navigate("/reviews");
  };
  const ratings = () => {
    navigate("/ratings");
  };

  return (
    <>
      <nav className={nStyles.navbar}>
        <ul>
          <li>
            <a href="#" onClick={pendingOrders}>
              <strong>Pending Orders</strong>
            </a>
          </li>
          <li>
            <a href="#" onClick={completedOrders}>
              <strong>Completed Orders</strong>
            </a>
          </li>
          <li>
            <a href="#" onClick={sellers}>
              <strong>sellers</strong>
            </a>
          </li>
          <li>
            <a href="#" onClick={buyers}>
              <strong>buyers</strong>
            </a>
          </li>
          <li>
            <a href="#" onClick={reviews}>
              <strong>Reviews</strong>
            </a>
          </li>
          <li>
            <a href="#" onClick={ratings}>
              <strong>Ratings</strong>
            </a>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              <strong>Logout</strong>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminNavbar;

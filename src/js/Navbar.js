import nStyles from "../css/navbar.module.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function Navbar() {
  const navigate = useNavigate();
  const [type, setType] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const checkSeller = async () => {
      const response = await fetch("http://localhost:5000/users/check-type", {
        method: "GET",
        credentials: "include",
        headers: { "Content-type": "application/json" },
      });
      const data = await response.json();
      if (data.message === "unauthorized") navigate("/");
      if (data.message) {
        setType(true);
      } else {
        setType(false);
      }
    };
    checkSeller();
  }, []);

  const handleHome = () => {
    navigate("/Main");
  };
  const handleCart = () => {
    navigate("/Cart");
  };
  const handleOrders = () => {
    navigate("/Orders");
  };
  const handleDashboard = () => {
    navigate("/Dashboard");
  };

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

  const handleSearch = () => {
    Cookies.set("searchQuery", query, { expires: 7 }); // expires in 7 days
    console.log("Saved in cookie:", query);
    navigate("/search");
  };

  return (
    <>
      <nav className={nStyles.navbar}>
        <ul>
          <li>
            <a href="#" onClick={handleHome}>
              <strong>Home</strong>
            </a>
          </li>
          {!type && (
            <li>
              <a href="#" onClick={handleCart}>
                <strong>Cart</strong>
              </a>
            </li>
          )}
          <li>
            <a href="#" onClick={handleOrders}>
              <strong>Orders</strong>
            </a>
          </li>
          <li>
            <a href="#" onClick={handleDashboard}>
              <strong>Dashboard</strong>
            </a>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              <strong>Logout</strong>
            </a>
          </li>
          <li className={nStyles.search_input}>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

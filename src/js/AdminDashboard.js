import nStyles from "../css/navbar.module.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar.js";

const AdminDashboard = () => {
  return (
    <>
      <AdminNavbar />
    </>
  );
};

export default AdminDashboard;

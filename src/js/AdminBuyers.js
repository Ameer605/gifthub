import styles from "../css/AdminPendingOrders.module.css";
import AdminNavbar from "./AdminNavbar.js";
import { useState, useEffect } from "react";

const AdminBuyers = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("http://localhost:5000/admin/buyers", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setSellers(data);
    };
    fetchOrders();
  }, []);
  return (
    <>
      <AdminNavbar />
      <div className={styles.main_sect}>
        {sellers &&
          sellers.map((seller) => (
            <div className={styles.product_card} key={seller._id}>
              <h3>Username: {seller.username}</h3>
            </div>
          ))}
      </div>
    </>
  );
};

export default AdminBuyers;

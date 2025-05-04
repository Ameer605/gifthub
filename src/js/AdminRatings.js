import styles from "../css/AdminPendingOrders.module.css";
import AdminNavbar from "./AdminNavbar.js";
import { useState, useEffect } from "react";

const AdminCompletedOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("http://localhost:5000/admin/ratings", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setOrders(data);
    };
    fetchOrders();
  }, []);
  return (
    <>
      <AdminNavbar />
      <div className={styles.main_sect}>
        {orders &&
          orders.map((order) => (
            <div className={styles.product_card} key={order._id}>
              <h3>Title: {order.title}</h3>
              <p>
                <strong>Username: {order.username}</strong>
              </p>
              <p>
                <strong>Ratings: {order.rating}</strong>
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default AdminCompletedOrders;

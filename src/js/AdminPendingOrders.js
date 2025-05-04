import styles from "../css/AdminPendingOrders.module.css";
import AdminNavbar from "./AdminNavbar.js";
import { useState, useEffect } from "react";

const AdminPendingOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        "http://localhost:5000/admin/pending-orders",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
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
                <strong>Buyer: {order.buyer}</strong>
              </p>
              <p>
                <strong>Seller: {order.seller}</strong>
              </p>
              <p>
                <strong>Price: {order.price}</strong>
              </p>
              <p>
                <strong>Quantity: {order.quantity}</strong>
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default AdminPendingOrders;

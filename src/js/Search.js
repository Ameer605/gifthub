import styles from "../css/Main.module.css";
import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const [retProducts, setRetProducts] = useState([]);
  const [type, setType] = useState(true);
  const [addedProducts, setAddedProducts] = useState([]);
  const [cmpltProducts, setCmpltProducts] = useState([]);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    const apiCall = async () => {
      const getProducts = await fetch(
        "http://localhost:5000/products/get-search-products",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await getProducts.json();
      console.log(data);
      if (data) setRetProducts(data.products);
      console.log(retProducts);
    };
    apiCall();
  }, []);

  useEffect(() => {
    const checkType = async () => {
      const response = await fetch("http://localhost:5000/users/check-type", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data.message);
      if (data.message === "unauthorized") navigate("/");
      if (data.message === true) {
        setType(true);
      } else {
        setType(false);
      }
    };
    checkType();
  }, []);

  useEffect(() => {
    const getCmpltProducts = async () => {
      const response = await fetch(
        "http://localhost:5000/orders/get-completed-products",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();

      setCmpltProducts(data);
    };
    getCmpltProducts();
  }, []);

  const handleCart = async (title, id) => {
    const response = await fetch("http://localhost:5000/cart/add-to-cart", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const data = await response.json();

    if (data.message === "unauthenticate") navigate("/");

    setAddedProducts((prev) => [...prev, id]);

    alert(data.message);
  };

  const handleInputChange = (title, field, value) => {
    setFeedback((prev) => ({
      ...prev,
      [title]: {
        ...prev[title],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e, title) => {
    e.preventDefault();
    const { review, rate } = feedback[title] || {};
    console.log(review, rate);
    console.log(`Title: ${title}, Review: ${review}, Rate: ${rate}`);

    const submitInputs = async () => {
      const response = await fetch(
        "http://localhost:5000/products/submit-review-rating",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ title, review, rate }),
        }
      );
      const data = await response.json();
      alert(data.message);
    };
    submitInputs();
  };

  return (
    <>
      <Navbar />
      <div className={styles.items_section}>
        {retProducts &&
          retProducts.map((product) => (
            <div
              key={product._id}
              className={`card ${styles.card}`}
              style={{ width: "18rem" }}
            >
              <img
                src={`http://localhost:5000/productImages/${product.imageURL}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Price (Rs): {product.price}</p>
                <p className="card-text">Quantity: {product.quantity}</p>
                {/*<p className="card-text">
                  Rating: 4 <small>/5</small>
                </p>*/}
                <p className="card-text">{product.description}</p>
                {!type && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleCart(product.title, product._id)}
                    disabled={addedProducts.includes(product._id)}
                  >
                    {addedProducts.includes(product._id)
                      ? "Added"
                      : "Add to cart"}
                  </button>
                )}

                {cmpltProducts.includes(product.title) && (
                  <>
                    <form onSubmit={(e) => handleSubmit(e, product.title)}>
                      <input
                        type="text"
                        placeholder="Review"
                        onChange={(e) =>
                          handleInputChange(
                            product.title,
                            "review",
                            e.target.value
                          )
                        }
                        className={styles.card_input}
                        required
                      />
                      <input
                        type="number"
                        placeholder="Rate"
                        min={1}
                        max={5}
                        onChange={(e) =>
                          handleInputChange(
                            product.title,
                            "rate",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) => e.preventDefault()} // disables typing
                        className={styles.card_input}
                        required
                      />
                      <button className="btn btn-primary">Submit</button>
                    </form>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Main;

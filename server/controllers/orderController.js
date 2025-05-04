import Order from "../models/ordersModel.js";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import CmpltOrder from "../models/cmpltOrdersModel.js";

const checkout = async (req, res) => {
  const orderData = req.body;
  const logUser = req.cookies.username;
  const insertProducts = [];

  if (!logUser) return res.status(404).json({ message: "unauthenticated" });

  for (const [title, qty] of Object.entries(orderData)) {
    const details = await Product.findOne({ title: title }).select("price");

    if (details) {
      insertProducts.push({
        username: logUser,
        title: title,
        quantity: qty,
        price: details.price,
        status: false,
      });
    }
  }

  try {
    await Order.insertMany(insertProducts);

    if (insertProducts && insertProducts.length > 0) {
      // Success
      await Cart.deleteMany({ username: logUser });
      return res.status(200).json({ message: "Order placed successfully." });
    } else {
      // No documents inserted
      return res.status(400).json({ message: "No orders were inserted." });
    }
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({ message: "Order placed successfully" });
};

const getOrderProducts = async (req, res) => {
  const logUser = req.cookies.username;
  if (!logUser) return res.status(400).json({ message: "unauthenticate" });

  try {
    const products = await Order.find({ username: logUser });

    if (products.length === 0) {
      const sellerProducts = await Product.find({ username: logUser });

      if (sellerProducts.length > 0) {
        const returnItems = [];
        for (let item of sellerProducts) {
          const product = await Order.find({ title: item.title });
          if (product.length === 0) continue;

          for (let i = 0; i < product.length; i++) {
            returnItems.push({
              _id: product[i]._id,
              username: product[i].username,
              title: item.title,
              quantity: product[i].quantity,
              imageURL: item ? item.imageURL : null,
              price: product[i] ? product[i].price : null,
              description: item ? item.description : null,
            });
          }
        }

        return res.status(200).json({ cart: returnItems });
      }
    } else {
      const detailedProducts = await Promise.all(
        products.map(async (item) => {
          const product = await Product.findOne({ title: item.title });

          return {
            _id: item._id,
            title: item.product,
            quantity: item.quantity,
            productQuantity: product ? product.quantity : null,
            imageURL: product ? product.imageURL : null,
            price: product ? product.price : null,
            description: product ? product.description : null,
          };
        })
      );
      return res.status(200).json({ cart: detailedProducts });
    }
  } catch (error) {
    console.log(error);
  }
};

const completeOrder = async (req, res) => {
  const { title, user, qnty } = req.body;
  console.log(qnty);
  try {
    const price = await Product.findOne({ title: title }).select("price");
    const cmplt = await new CmpltOrder({
      username: user,
      title: title,
      quantity: qnty,
      price: price.price,
    });
    await cmplt.save();

    await Order.deleteOne({ username: user, title: title });

    const getQty = await Product.findOne({ title: title }).select("quantity");

    const updatedQuantity = parseInt(getQty.quantity) - parseInt(qnty);

    const updateQuantity = await Product.updateOne(
      { title: title },
      { $set: { quantity: updatedQuantity } }
    );

    if (!updateQuantity) {
      return res.status(404).json({ message: "Server error" });
    }

    return res.status(200).json({ message: "Marked as completed" });
  } catch (error) {
    console.log(error);
  }
};

const getCmpltOrders = async (req, res) => {
  const logUser = req.cookies.username;
  console.log(logUser);
  try {
    const returnArray = [];
    const cmplt = await CmpltOrder.find({ username: logUser });

    for (const order of cmplt) returnArray.push(order.title);
    return res.status(200).json(returnArray);
  } catch (error) {
    console.log(error);
  }
};

export default { checkout, getOrderProducts, completeOrder, getCmpltOrders };

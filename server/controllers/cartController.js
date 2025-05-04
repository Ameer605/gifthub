import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

const addToCart = async (req, res) => {
  const { title } = req.body;
  const logUser = req.cookies.username;

  if (!logUser) return res.status(400).json({ message: "unauthenticate" });

  const checkPrev = await Cart.findOne({ username: logUser, product: title });

  if (checkPrev) return res.status(200).json({ message: "Already added" });

  try {
    const insert = new Cart({ username: logUser, product: title, quantity: 1 });
    const response = await insert.save();

    if (response)
      return res.status(201).json({ message: "Added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCartProducts = async (req, res) => {
  const logUser = req.cookies.username;
  if (!logUser) return res.status(400).json({ message: "unauthenticate" });

  const products = await Cart.find({ username: logUser });
  const detailedProducts = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findOne({ title: item.product });

      return {
        _id: product._id,
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
};

export default { addToCart, getCartProducts };

import Payment from "../models/paymentDetailsModel.js";

const addDetails = async (req, res) => {
  const { cardNumber, expiry, cvc, cardHolderName } = req.body;
  const logUser = req.cookies.username;

  if (!logUser) {
    return res.status(401).json({ message: "Login to continue" });
  }

  try {
    const payment = new Payment({
      username: logUser,
      cardNumber,
      expiry,
      cvc,
      cardHolderName,
    });
    const response = await payment.save();

    if (response)
      return res
        .status(201)
        .json({ message: "Payment details added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default { addDetails };

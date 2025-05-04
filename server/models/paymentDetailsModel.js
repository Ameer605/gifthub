import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expiry: {
    type: String,
    required: true,
  },
  cvc: {
    type: String,
    required: true,
  },
  cardHolderName: {
    type: String,
    required: true,
  },
});

const PaymentDetails = mongoose.model("PaymentDetails", paymentSchema);

export default PaymentDetails;

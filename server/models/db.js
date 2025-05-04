import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://ameerhamzamalik19:koinimilna123@userinfo.havihwx.mongodb.net/?retryWrites=true&w=majority&appName=userInfo";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;

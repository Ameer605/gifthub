import User from "../models/userInfoModel.js";
import bcrypt from "bcryptjs";
import Admin from "../models/adminModel.js";

const signup = async (req, res) => {
  const { email, name, userType, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      email,
      name,
      userType,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const data = await User.findOne({ username });

    if (!data) {
      const admin = await Admin.findOne({ username });

      if (admin) {
        const isMatch = password == admin.password ? true : false;

        if (isMatch) {
          console.log("Admin");
          return res.status(200).json({ message: "admin" });
        }
      }
      return res.status(400).json({ message: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(password, data.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    } else {
      res.cookie("username", username, {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true, // 🔥 cannot be accessed by frontend JavaScript
        secure: false, // set true if you are using HTTPS
        sameSite: "lax", // 🛡️ helps send cookies cross-site
        path: "/",
      });

      return res.status(200).json({ message: "true" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" }); // Internal server error
  }
};

const checkDetails = async (req, res) => {
  const { email, username } = req.body;

  try {
    let flag = true;
    const data = await User.findOne({ email });
    const userData = await User.findOne({ username });
    if (data) {
      flag = false;
      return res.status(400).json({ message: "Email already exists" });
    }
    if (userData) {
      flag = false;
      return res.status(400).json({ message: "Username already exists" });
    }
    if (flag) {
      return res.status(200).json({ message: "true" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" }); // Internal server error
  }
};

const checkType = async (req, res) => {
  const logUser = req.cookies.username;

  const userData = await User.findOne({ username: logUser });

  if (!userData) {
    return res.status(401).json({ message: "unauthorized" });
  } else {
    const userType = await User.findOne(
      { username: logUser },
      { userType: 1, _id: 0 }
    );
    if (userType.userType === "seller")
      return res.status(200).json({ message: true });
    else return res.status(200).json({ message: false });
  }
};

const profileDetails = async (req, res) => {
  const logUser = req.cookies.username;

  const details = await User.findOne({ username: logUser }).select(
    "email name username"
  );

  if (!details) return res.status(400).json({ message: "User not found" });
  else return res.status(200).json(details);
};

const logout = (req, res) => {
  res.clearCookie("username", {
    httpOnly: true,
    secure: false, // same as when you set it
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({ message: true });
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const logUser = req.cookies.username;

  const data = await User.findOne({ username: logUser });

  if (!data) return res.status(400).json({ message: "Login again" });

  const isMatch = await bcrypt.compare(oldPassword, data.password);

  if (!isMatch)
    return res.status(400).json({ message: "Incorrect old password" });

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  const result = await User.updateOne(
    { username: logUser },
    { $set: { password: newHashedPassword } }
  );

  if (result.modifiedCount === 1)
    return res.status(200).json({ message: "Password updated successfully" });
};

export default {
  signup,
  login,
  checkDetails,
  checkType,
  profileDetails,
  logout,
  changePassword,
};

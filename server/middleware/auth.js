import User from "../models/userInfoModel.js";

const authCheckoutMiddleware = async (req, res, next) => {
  try {
    // 1. Check if the cookie exists
    const username = req.cookies.username;
    if (!username) {
      return res.status(401).json({
        success: false,
        message: "Not logged in. Please log in to checkout.",
      });
    }

    // 2. Verify the username in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Session may be expired.",
      });
    }

    // 3. Attach user to `req` for later use (optional)
    //req.user = user;

    // 4. Proceed to checkout
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during authentication.",
    });
  }
};

export default authCheckoutMiddleware;

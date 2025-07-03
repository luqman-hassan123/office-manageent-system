const userService = require("../services/userService");

const registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { token, user } = await userService.loginUser(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};

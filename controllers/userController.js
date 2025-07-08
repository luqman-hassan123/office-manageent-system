const userService = require("../services/userService");

//registor new user
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
// update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await userService.updateUser(id, updates);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedUser
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
// login user
const loginUser = async (req, res) => {
  try {
    const { token, user } = await userService.loginUser(req.body);
    console.log("user role is  ", req.user)
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,       //do not show user data only token 
    });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};
// Soft delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userService.softDeleteUser(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
// Get all users (with pagination, search, filtering)
const getUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { role, name } = req.query;
    const [users, total] = await userService.getUsers({ page, limit, role, name });
    res.status(200).json({
      success: true,
      total,
      page,
      limit,
      users,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
 // Reset password (by the user themselves)
const resetPassword = async (req, res) => {
  try {
    const userId = req.user.id; // extracted from token via middleware
    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).json({ success: false, message: "New password is required." });
    }
    const updatedUser = await userService.resetPassword(userId, newPassword);
    res.status(200).json({
      success: true,
      message: "Password reset successful",
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUsers,
  resetPassword
};

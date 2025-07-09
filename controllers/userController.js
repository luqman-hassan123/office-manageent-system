const userService = require("../services/userService");

//registor new user
const registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
      },
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
      data: {
        updatedUser,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
// login user
const loginUser = async (req, res) => {
  try {
    const { token } = await userService.loginUser(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { token },
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
      data: {
        deletedUser,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
// Get all users (with pagination, search, filtering)
const getUsers = async (req, res) => {
  try {
    const { page, limit, role, name } = req.query;
    const [users, total] = await userRepository.getUsers({
      page,
      limit,
      role,
      name,
    });

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: {
        total,
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        users,
      },
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
      return res
        .status(400)
        .json({ success: false, message: "New password is required." });
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
  resetPassword,
};

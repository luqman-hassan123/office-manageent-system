const userService = require("../services/userService");

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
    const id = req.params.id;
    const updatedData = req.body;
    const updatedUser = await userService.updateUser(id, updatedData);
    if (!updatedUser) {
      console.error(`User not found with ID: ${userId}`);
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
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
// Get all users
const getUsers = async (req, res) => {
  console.log("Users:", getUsers);

  try {
    const { page, limit, role, name } = req.query;
    const [users, total] = await userService.getUsers({
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
    const userId = req.user.id;
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

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
    const { page, limit, role, name } = req.query;
    const [users, total] = await userRepository.getUsers({ page, limit, role, name });

    res.status(200).json({
      success: true,
      total,
      // which page the user want to strat from by default 1 
      page: Number(page) || 1,
      //how many record to be shown per page
      limit: Number(limit) || 10,
      users,
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
  getUsers
};

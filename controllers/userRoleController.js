const userRoleService = require("../services/userRoleService");

//create user role
const createUserRole = async (req, res) => {
  try {
    const userRole = await userRoleService.createRole(req.body);
    res.status(201).json({
      success: true,
      message: "User role created successfully",
      userRole,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
//get all user roles
const getAllUserRoles = async (req, res) => {
  try {
    const userRoles = await userRoleService.getAllUserRoles();
    res.status(200).json({
      success: true,
      message: "User roles retrieved successfully",
      userRoles,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
// get user role by id
const getUserRoleById = async (req, res) => {
  try {
    const userRole = await userRoleService.getUserRoleById(req.params.id);
    res.status(200).json({
      success: true,
      message: "User role retrieved successfully",
      userRole,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "User role not found" });
  }
};
//get user role by name
const getUserRoleByName = async (req, res) => {
  try {
    const userRole = await userRoleService.getUserRoleByName(req.params.name);
    res.status(200).json({
      success: true,
      message: "User role retrieved successfully",
      userRole,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "User role not found" });
  }
};

//update user role
const updateUserRole = async (req, res) => {
  try {
    const userRole = await userRoleService.updateRole(req.body);
    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      userRole,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
//delete user role
const deleteUserRole = async (req, res) => {
  try {
    const userRole = await userRoleService.deleteRole(req.params.id);
    res.status(200).json({
      success: true,
      message: "User role deleted successfully",
      userRole,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  createUserRole,
  getAllUserRoles,
  getUserRoleById,
  getUserRoleByName,
  updateUserRole,
  deleteUserRole,
};

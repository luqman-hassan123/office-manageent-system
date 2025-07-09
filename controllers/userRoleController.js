const userRoleService = require("../services/userRoleService");

//create user role
const createUserRole = async (req, res) => {
  try {
    const userRole = await userRoleService.createRole(req.body);
    res.status(201).json({
      success: true,
      message: "User role created successfully",
      data: {
        userRole,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
//get all user roles
const getAllUserRoles = async (req, res) => {
  try {
    const allUsers = await userRoleService.getRoles();
    res.status(200).json({
      success: true,
      message: "User roles retrieved successfully",
      data: {
        allUsers,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
// get user role by id
const getUserRoleById = async (req, res) => {
  try {
    const id = req.params.id;
    const userRole = await userRoleService.getUserRoleById(id);
    res.status(200).json({
      success: true,
      message: "User role retrieved successfully",
      data: { userRole },
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "User role not found" });
  }
};
//update user role
const updateUserRole = async (req, res) => {
  try {
    const update = await userRoleService.updateRole(req.body);
    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: {
        update,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
//delete user role
const deleteUserRole = async (req, res) => {
  try {
    const deleteRole = await userRoleService.deleteRole(req.params.id);
    res.status(200).json({
      success: true,
      message: "User role deleted successfully",
      data: {
        deleteRole,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  createUserRole,
  getAllUserRoles,
  getUserRoleById,
  updateUserRole,
  deleteUserRole,
};

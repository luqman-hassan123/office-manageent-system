const User = require("../models/user");

// create new user
const createUser = (userData) => User.create(userData);
// find user by email
const findByEmail = (email) => User.findOne({ email });
// find user by id
const findUserRoleById = (id) => User.findById(id);
//find by id
const findById = (id) => User.findById(id);
// Find user by id and populate role
const findByIdWithRole = (id) => {
  return User.findById(id);
};
// update user
const updateUser = (id, updates) => {
  return User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
};
//get all users
const getAllUsers = () => {
  return User.find({ isDeleted: false }).populate("role", "name");
};
// delete user
const softDeleteUser = (id) => {
  return User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};
// Reset user password (used in password reset)
const resetPassword = (id, newHashedPassword) => {
  return User.findByIdAndUpdate(
    id,
    { password: newHashedPassword },
    { new: true, runValidators: true }
  );
};
// Get users with pagination, filtering
const getUsers = ({ page = 1, limit = 10, role, name }) => {
  const filters = { isDeleted: false };
  if (role) filters.role = role;
  if (name) filters.name = { $regex: name, $options: "i" };
  //how many item to be skip
  const skip = (page - 1) * limit;
  //Find users with applied filters and pagination:
  return Promise.all([
    User.find(filters).skip(skip).limit(Number(limit)),
    //count total documents per page
    User.countDocuments(filters)
  ]);
};

module.exports = {
  findByEmail,
  findUserRoleById,
  findById,
  createUser,
  findByIdWithRole,
  updateUser,
  getAllUsers,
  softDeleteUser,
  getUsers,
  resetPassword
};

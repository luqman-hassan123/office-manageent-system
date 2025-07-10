const User = require("../models/user");

const createUser = (userData) => User.create(userData);
const findByEmail = (email) => User.findOne({ email }).populate("role");
const findUserRoleById = (id) => User.findById(id);
const findById = (id) => User.findById(id);
// Find user by id and populate role
const findByIdWithRole = (id) => {
  return User.findById(id)
  .select("name email role")
  .populate("role", "name");
};
const updateUser = (id, userData) => {
  return User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });
};
//get all users
const getAllUsers = () => {
  return User.find({ isDeleted: false })
    .select("name  role")
    .populate("role", "name"); 
};
const resetPassword = (_id, newHashedPassword) => {
  return User.findByIdAndUpdate(
    _id,
    { password: newHashedPassword },
    { new: true }
  );
};
const softDeleteUser = (id) => {
  return User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};
// Get users with pagination, filtering (used in controller)
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

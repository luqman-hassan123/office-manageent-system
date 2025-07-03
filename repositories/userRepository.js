const User = require("../models/user");

const findByEmail = (email) => User.findOne({ email });
const findById = (id) => User.findById(id);
const createUser = (userData) => User.create(userData);
const getAllUsers = () => User.find();

module.exports = {
  findByEmail,
  findById,
  createUser,
  getAllUsers,
};

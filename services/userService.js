const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");
const userRoleRepository = require ("../repositories/userRoleRepository")

const registerUser = async ({ name, email, password, role }) => {
  // Check if user already exists
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }
const roleDoc = await userRoleRepository.findByName(role);
  if (!roleDoc) {
    throw new Error(`Role "${role}" not found`);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await userRepository.createUser({
    name,
    email,
    password: hashedPassword,
    role: roleDoc._id, 
  });
  user.password = undefined;
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
//login user
const loginUser = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign(
    { id: user._id, role: user.role.name  },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return { token };
};
//get users
const getUsers = async ({ page, limit, role, name }) => {
  return userRepository.getUsers({ page, limit, role, name });
};

const updateUser = async (_id, updates) => {
  if (updates.password) {
    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(updates.password, salt);
  }
  return userRepository.updateUser(_id, updates);
};
//delete
const softDeleteUser = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error("User not found to be delete");
  }
  user.isDeleted = true;
  await user.save();
  return user;
};
const resetPassword = async (_id, newPassword) => {
  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  // Update password using repository
  const updatedUser = await userRepository.resetPassword(_id, hashedPassword);
  if (!updatedUser) {
    throw new Error("User not found or password reset failed.");
  }
  return updatedUser;
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  softDeleteUser,
  resetPassword
};

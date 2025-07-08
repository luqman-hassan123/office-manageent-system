const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");
const userRoleRepository = require ("../repositories/userRoleRepository")

const registerUser = async ({id, name, email, password, role }) => {
  // Check if user already exists
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }
const roleDoc = await userRoleRepository.findByName(role);
  if (!roleDoc) {
    throw new Error(`Role "${role}" not found`);
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create user
  //console.log("Resolved roleDoc:", roleDoc);

  const user = await userRepository.createUser({
    id,
    name,
    email,
    password: hashedPassword,
    role: roleDoc._id, // store ObjectId,
  });
  return user;
};
//login user
const loginUser = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  //console.log("userFirst",user)
  // Compare given password with stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  //  console.log("userTest",user)
  // Generate JWT token with user ID and role
  const token = jwt.sign(
    { id: user._id, role: "Admin" },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return { token, user };
};
//get users
const getUsers = async ({ page, limit, role, name }) => {
  return userRepository.getUsers({ page, limit, role, name });
};
const updateUser = async (id, updates) => {
  // Optionally hash password if it’s being updated
  if (updates.password) {
    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(updates.password, salt);
  }
  return userRepository.updateUser(id, updates);
};
//delete
const softDeleteUser = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  user.isDeleted = true;
  await user.save();
  return user;
};
const resetPassword = async (id, newPassword) => {
  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  // Update password using repository
  const updatedUser = await userRepository.resetPassword(id, hashedPassword);
  if (!updatedUser) {
    throw new Error("User not found or password reset failed.");
  }
  return updatedUser;
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  softDeleteUser,
  resetPassword,
  getUsers
};

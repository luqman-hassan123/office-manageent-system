const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

const registerUser = async ({id, name, email, password, role }) => {
  // Check if user already exists
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create user
  const user = await userRepository.createUser({
    id,
    name,
    email,
    password: hashedPassword,
    role,
  });
  return user;
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
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return { token, user };
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

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  softDeleteUser
};

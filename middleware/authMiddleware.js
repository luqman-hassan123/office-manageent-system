const jwt = require('jsonwebtoken');
const userRepository = require("../repositories/userRepository");

const protect = async (req, res, next) => {
  // Extract token from Authorization header (e.g., Bearer <token>)
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }
  try {
    // Middleware to allow only specific roles to access a route
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userRepository.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
// Middleware to allow only specific roles to access a route
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user?.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };
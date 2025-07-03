const jwt = require('jsonwebtoken');
//const userRepository = require("../repositories/userRepository");

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userRepo.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
//Role-based check
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user?.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };
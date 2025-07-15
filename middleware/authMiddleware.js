const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

const protect = async (req, res, next) => {
  // Extract token from Authorization header (e.g., Bearer <token>)
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }
  console.log(token);
  try {
    // Middleware to allow only specific roles to access a route
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user =decoded;
    console.log("Decoded user with role:", req.user);
    console.log("Role after populate:", req.user.role);

    next();
  } catch (err) {
    throw new Error("Error getting roles: " + err.message);
  }
};
//Middleware to allow only specific roles to access a route
// const authorizeRoles = (...allowedRoles) => {
//   return (req, res, next) => {
//     const userRoleName = req.user?.role; 
//     console.log("role name is ", userRoleName)
//     console.log("Allowed Roles:", allowedRoles);
//     console.log("Current Role:", req.user?.role);
//     if (!allowedRoles.includes(req.user?.role)) {
//       return res.status(403).json({ message: "Forbidden: Insufficient role" });
//     }
//     next();
//   };
// };

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("allowed",allowedRoles)
    const currentRoleName = req.user?.role;
    console.log("Current Role Name:", currentRoleName);
    if (!allowedRoles.map(r => r.toLowerCase()).includes(currentRoleName)) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };

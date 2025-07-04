const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const {
  loginUser,
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {
  registerValidation,
  loginValidation,
} = require("../validations/userValidation");

// Register user
router.post("/register", [...registerValidation], validate, registerUser);
// Login user
router.post("/login", [...loginValidation], validate, loginUser);
router.put("/:id", protect, authorizeRoles("Admin"), updateUser);
router.delete("/:id", protect, authorizeRoles("Admin"), deleteUser);
router.get("/", protect, authorizeRoles("Admin"), getUsers);

module.exports = router;

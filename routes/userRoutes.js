const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const {
  loginUser,
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
  resetPassword,
} = require("../controllers/userController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {
  registerValidation,
  loginValidation,
} = require("../validations/userValidation");

router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);
router.patch("/reset-password/id", protect, resetPassword);
// Admin-only routes, applies to all routes below
router.use(protect, authorizeRoles("Admin")); 
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getUsers);

module.exports = router;

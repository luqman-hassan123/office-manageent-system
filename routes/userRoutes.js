const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const userController = require("../controllers/userController");
const { registerValidation, loginValidation } = require("../validations/userValidation");

// Register user
router.post("/register", [...registerValidation], validate, userController.registerUser);
// Login user
router.post("/login", [...loginValidation], validate, userController.loginUser);

module.exports = router;

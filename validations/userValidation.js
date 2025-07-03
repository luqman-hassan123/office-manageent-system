const { body } = require("express-validator");

const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name required")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 3 })
    .withMessage("password must be at least 3 characters"),

  body("role")
    .notEmpty()
    .withMessage("Role required")
    .isIn(["Admin", "Manager", "Employee"])
    .withMessage("role must be Admin, Manager or Employee"),
];

const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .notEmpty()
    .withMessage("Password required"),
];

module.exports = { registerValidation, loginValidation };

const express = require("express");
const router = express.Router();
const {
  createUserRole,
  getAllUserRoles,
  getUserRoleById,
  updateUserRole,
  deleteUserRole,
} = require("../controllers/userRoleController");
const {
  createValidation,
  updateValidation,
  deleteValidation,
} = require("../validations/userRoleValidation");

router.post("/", createValidation, createUserRole);
router.get("/", getAllUserRoles);
router.get("/:id", getUserRoleById);
router.put("/:id", [...updateValidation], updateUserRole);
router.delete("/:id", [...deleteValidation], deleteUserRole);

module.exports = router;
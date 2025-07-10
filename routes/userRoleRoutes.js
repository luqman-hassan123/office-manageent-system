const express = require("express");
const router = express.Router();
const {
  createUserRole,
  getAllUserRoles,
  getUserRoleById,
  getUserRoleByName,
  updateUserRole,
  deleteUserRole,
} = require("../controllers/userRoleController");
const {
  createValidation,
  updateValidation,
  deleteValidation,
} = require("../validations/userRoleValidation");

router.post("/create", [...createValidation], createUserRole);
router.get("/", getAllUserRoles);
router.get("/:id", getUserRoleById);
router.get("/:roleName", getUserRoleByName);
router.put("/:id", [...updateValidation], updateUserRole);
router.delete("/:id", [...deleteValidation], deleteUserRole);

module.exports = router;
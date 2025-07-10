const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getMyAttendance,
  getAllAttendance,
  getTeamAttendance,
  getAttendanceReport,
} = require("../controllers/attendanceController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/mark", authorizeRoles("Employee"), markAttendance);
router.get("/me", protect, authorizeRoles("Employee"), getMyAttendance);
router.post("/team", protect, authorizeRoles("Manager"), getTeamAttendance);
router.get("/all", protect, authorizeRoles("Admin"), getAllAttendance);
router.get("/report", protect, authorizeRoles("Admin"), getAttendanceReport);

module.exports = router;

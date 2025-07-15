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

router.post("/mark", protect , markAttendance);
router.get("/me", protect, getMyAttendance);
router.get("/team", protect, authorizeRoles("manager"), getTeamAttendance);
router.get("/all", protect, authorizeRoles("admin"), getAllAttendance);
router.get("/report", protect, authorizeRoles("admin"), getAttendanceReport);

module.exports = router;

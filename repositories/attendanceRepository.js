const Attendance = require("../models/Attendance");

const markAttendance = (data) => {
  return Attendance.create(data);
};

const getAttendanceByUser = (id) => {
  return Attendance.findOne({ user: id });
};

// const getAllAttendance = () => {
//   return Attendance.find().populate("user", "role");
// };

const getAllAttendance = () => {
  return Attendance.find().populate({ path: "userRole", select: "name" });
};

const getAttendanceByTeam = (teamUserIds) => {
  return Attendance.find({ user: { $in: teamUserIds } })
    .populate("user", "name");
};

const getAttendanceReport = (filters = {}) => {
  return Attendance.find(filters).populate("user", "name");
};

module.exports = {
  markAttendance,
  getAttendanceByUser,
  getAllAttendance,
  getAttendanceByTeam,
  getAttendanceReport,
};

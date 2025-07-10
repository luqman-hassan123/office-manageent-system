const Attendance = require("../models/attendance");

const markAttendance = (data) => {
  Attendance.create(data);
};

const getAttendanceByUser = (id) => {
  return Attendance.findOne({ user: id });
};

const getAllAttendance = () => {
  return Attendance.find().populate("user", "name email");
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

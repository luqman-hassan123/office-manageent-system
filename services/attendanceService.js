const attendanceRepository = require("../repositories/attendanceRepository");

const markAttendance = async (userId, { checkIn, checkOut, type }) => {
  const today = new Date().toISOString().slice(0, 10);
  const attendanceData = {
    checkIn,
    checkOut,
    type,
    status: determineStatus(checkIn),
  };
  return attendanceRepository.markAttendance(userId, today, attendanceData);
};

const determineStatus = (checkInTime) => {
  const officeStart = new Date();
  officeStart.setHours(9, 15);
const userCheckIn = new Date(`${data()}T${checkInTime}:00`);
  if (userCheckIn > officeStart) return "Late";
  return "Present";
};

const getMyAttendance = async (userId) => {
  return attendanceRepository.getAttendanceByUser(userId);
};

const getAllAttendance = async () => {
  return attendanceRepository.getAllAttendance();
};

const getTeamAttendance = async (teamUserIds) => {
  return attendanceRepository.getAttendanceByTeam(teamUserIds);
};

const getAttendanceReport = async (filters) => {
  return attendanceRepository.getAttendanceReport(filters);
};

module.exports = {
  markAttendance,
  getMyAttendance,
  getAllAttendance,
  getTeamAttendance,
  getAttendanceReport,
};

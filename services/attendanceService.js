const attendanceRepository = require("../repositories/attendanceRepository");

const markAttendance = async (userId, { checkInTime, checkOutTime, attendanceType }) => {
  const checkIn = new Date(checkInTime);
  const checkOut = checkOutTime ? new Date(checkOutTime) : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendanceData = {
    user: userId,
    date: today,
    checkInTime: checkIn,
    checkOutTime: checkOut,
    attendanceType: attendanceType || "Onsite",
    status: determineStatus(checkIn),
  };

  return attendanceRepository.markAttendance(attendanceData);
};

const determineStatus = (checkInTime) => {
  const officeStart = new Date();
  officeStart.setHours(9, 15, 0, 0); 

  if (checkInTime > officeStart) return "Late";
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

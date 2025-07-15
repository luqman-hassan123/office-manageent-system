const attendanceService = require("../services/attendanceService");

const markAttendance = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.id;
    const result = await attendanceService.markAttendance(userId, req.body);

    res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error occur to mark attendance " + err.message });
  }
};

const getMyAttendance = async (req, res) => {
  try {
    const userId = req.user._id;
    const attendance = await attendanceService.getMyAttendance(userId);
    res.status(200).json({
      success: true,
      message: "fetched attendance successfully",
      data: {
        attendance,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAllAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.getAllAttendance();
    res.status(200).json({
      success: true,
      message: "Fetched all attendance successfully",
      data: {
        attendance,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getTeamAttendance = async (req, res) => {
  try {
    const teamUserIds = req.body.teamUserIds;
    const attendance = await attendanceService.getTeamAttendance(teamUserIds);
    res.status(200).json({
      success: true,
      message: "get team attendance successfully",
      data: {
        attendance,
        teamUserIds,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAttendanceReport = async (req, res) => {
  try {
    const filters = req.query;
    const report = await attendanceService.getAttendanceReport(filters);
    res.status(200).json({
      success: true,
      message: "get attendance report successfully",
      data: {
        report,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  markAttendance,
  getMyAttendance,
  getAllAttendance,
  getTeamAttendance,
  getAttendanceReport,
};

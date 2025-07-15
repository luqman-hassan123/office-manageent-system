const Leave = require("../models/leave");

const applyLeave = async (leaveData) => {
  return await Leave.create(leaveData);
};

const getAllLeaves = async () => {
  return await Leave.find().populate("employee reviewedBy", "name email role").sort({ createdAt: -1 });
};

const getLeaveById = async (_id) => {
  return await Leave.findById(_id).populate("employee reviewedBy", "name email role");
};

const getLeavesByEmployee = async (_id) => {
  return await Leave.find({ employee: _id }).sort({ createdAt: -1 });
};

const getLeavesByStatus = async (status) => {
  return await Leave.find({ status }).populate("employee", "name email");
};

const updateLeaveStatus = async (id, status, reviewedBy) => {
  return await Leave.findByIdAndUpdate(
    id,
    { status, reviewedBy, reviewedAt: new Date() },
    { new: true }
  );
};

module.exports = {
  applyLeave,
  getLeaveById,
  getLeavesByEmployee,
  getAllLeaves,
  getLeavesByStatus,
  updateLeaveStatus,
};

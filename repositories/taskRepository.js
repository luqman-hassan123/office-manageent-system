const Task = require("../models/Task");

const createTask = (taskData) => Task.create(taskData);

const getAllTasks = () => Task.find().populate("assignedTo assignedBy", "name email");

const getTaskById = (id) => Task.findById(id).populate("assignedTo assignedBy", "name email");

const getTasksByEmployee = (employeeId) => {
  return Task.find({ assignedTo: employeeId }).populate("assignedBy", "name");
};

const getTasksByManager = (managerId) => {
  return Task.find({ assignedBy: managerId }).populate("assignedTo", "name");
};

const updateTask = (taskId, updateData) => {
  return Task.findByIdAndUpdate(taskId, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteTask = (taskId) => Task.findByIdAndDelete(taskId);

const addComment = async (taskId, commentData) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found");
  task.comments.push(commentData);
  await task.save();
  return task;
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  getTasksByEmployee,
  getTasksByManager,
  updateTask,
  deleteTask,
  addComment
};

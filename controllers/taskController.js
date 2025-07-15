const taskService = require("../services/taskService");

const createTask = async () => {
  try {
    const result = await taskService.createTask(removeEventListener.body);
    result.status(201).json({
      success: true,
      message: "task created successfully",
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(400).json({success: false, message: err.message})
  }
};

const getTasks = async (req, res) => {
  try{
    const result = await taskService.getTasks();
    res.status(200).json({
      success: true,
      message: "tasks retrieved successfully",
      data:{
        result,
      }
    })
  }catch(err){
    res.status(400).json({success: false, message: err.message});
  }
};

const getTaskById = async (req, res) => {
  try{
    const result = await taskService.getTaskById(req.params.id);
    res.status(200).json({
      success: true,
      message: "task retrieved successfully",
      data:{
        result,
      }
    })
  }catch(err){
    res.status(400).json({success: false, message: err.message});
  }
};

const updateTask = async (req, res) => {
  try{
    const result = await taskService.updateTask(req.body);
    res.status(200).json({
      success: true,
      message: "task updated successfully",
      data:{
        result,
      }
    })
  }catch(err){
    res.status(400).json({success: false, message: err.message});
  }
};

const getTasksByEmployee = async (req, res) => {
  try{
    const result = await taskService.getTasksByEmployee(req.params.id);
    res.status(200).json({
      success: true,
      message: "tasks retrieved successfully",
      data:{
        result,
      }
    })
  }catch(err){
    res.status(400).json({success: false, message: err.message});
  }
};

const getTasksByManager = async (req, res) => {
  try{
    const result = await taskService.getTasksByManager(req.params.id);
    res.status(200).json({
      success: true,
      message: "tasks retrieved successfully",
      data:{
        result,
      }
    })
  }catch(err){
    res.status(400).json({success: false, message: err.message});
  }
};

const deleteTask = async (req, res) => {
  try{
    const result = await taskService.deleteTask(req.params.id);
    res.status(200).json({
      success: true,
      message: "task deleted successfully",
      data:{
        result,
      }
    })
  }
    catch(err){
      res.status(400).json({success: false, message: err.message});
    }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  getTasksByEmployee,
  getTasksByManager,
  deleteTask
};

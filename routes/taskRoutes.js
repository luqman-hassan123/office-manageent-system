const express = require ('express');
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  getTasksByEmployee,
  getTasksByManager,
  deleteTask
} = require ("../controllers/taskController")

router.post("/create", createTask);
router.get("/", getTasks);
router.get("/task/:id", getTaskById);
router.get("/employee/:id", getTasksByEmployee);
router.get("/manager/:id", getTasksByManager);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

module.exports = router;

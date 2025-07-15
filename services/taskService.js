const taskRepository = require("../repositories/taskRepository")

const createTask = async () => {
    try{
        const result = await taskRepository.createTask({taskData});
        return result;

    }catch(err){
        throw Error ("Error creating task" + err.message)
    }
};

const getTasks = async () => {
    try{
        const result = await taskRepository.getTasks();
        return result;
    }catch(err){
        throw Error("Error getting tasks" + err.message)
    }
};

const getTaskById = async (taskId) => {
    try{
        const result = await taskRepository.getTaskById(taskId);
        return result;
    }catch(err){
        throw Error("Error getting task by id" + err.message)
    }
};

const updateTask = async (_id, taskData) => {
    try{
        const result = await taskRepository.taskRepository(_id, taskData);
        return result;
    }catch(err){
        throw Error("Error updating task" + err.message);
    }
};

const getTasksByEmployee = async (_id ) => {
    try{
        const result = await taskRepository.getTasksByEmployee(_id);
        return result;
    }catch(err){
        throw Error("Error getting tasks by employee" + err.message);
    }
};

const getTasksByManager =async (_id) => {
    try{
        const result = await taskRepository.getTasksByManager(_id);
        return result;
    }catch(err){
        throw Error("Error getting tasks by manager" + err.message);
    }
};

const deleteTask = async(_id) => {
    try{
        const result = await taskRepository.deleteTask(_id);
        return result;
    }catch(err){
        throw Error("Error deleting task" + err.message);
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
}
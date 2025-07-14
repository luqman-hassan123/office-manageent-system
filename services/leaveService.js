const leaveRepository = require ("../repositories/leaveRepository")

const createLeaveRequest = async (leaveData) => {
    try{
        const leave =  await leaveRepository.create(leaveData);
        return leave;
    }catch(err){
        throw new Error ("Error creating leave request", + err.message);
    }
};

const getAllLeaves = async () => {
    try{
        const leaves = await leaveRepository.getAllLeaves();
        return leaves;
    }catch(err){
        throw new Error ("Error fetching leaves", + err.message);
    }
};

const getLeaveById = async (id) => {
    try{
        const leave = await leaveRepository.getLeaveById(id);
        return leave;
    }catch(err){
        throw new Error ("Error fetching leave by id", + err.message);
    }
};

const getLeavesByEmployee = async (_id) => {
    try{
        const leaves = await leaveRepository.getLeavesByEmployee(_id);
        return leaves;
    }catch(err){
        throw new Error ("Error fetching leaves by employee", + err.message);
    };

};

const getLeavesByStatus = async (status) => {
    try{
        const leaves = await leaveRepository.getLeavesByStatus(status);
        return leaves;
    }catch(err){
        throw new Error ("Error fetching leaves by status", + err.message);
    }

};

const updateLeave = async (id, leaveData) => {
    try{
        const leave = await leaveRepository.updateLeave(id, leaveData);
        return leave;
    }catch(err){
        throw new Error ("Error updating leave", + err.message);
    }
};

module.exports = {
    createLeaveRequest,
    getAllLeaves,
    getLeaveById,
    updateLeave,
    getLeavesByStatus,
    getLeavesByEmployee
}
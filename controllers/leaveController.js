const leaveService = require ("../services/leaveService")

const createLeaveRequest = async (req, res) => {
    try{
        const leaveRequest = await leaveService.createLeaveRequest(req.body);
        res.status(201).json({
            success: true,
            message: "Leave request created successfully",
            data:{
                leaveRequest,
            }
        });
    }catch(err){
        res.status(500).json({ sucess: false, message: err.message});
    }
};

const getLeaveRequests = async (req, res) => {
    try{
        const leaveRequests = await leaveService.getAllLeaves();
        res.status(200).json({
            success: true,
            message: "Leave requests retrieved successfully",
            data:{
                leaveRequests,
                }
        })
    }catch(err){
        res.status(500).json({ sucess: false, message: err.message});
    }
};

const getLeaveById = async (req, res) => {
    try{
        const leaveId = req.params.id;
        const leave = await leaveService.getLeaveById(leaveId);

        if (!leave) {
            res.status().json({
                success: false,
                message: "Leave not found",
            })
        };

        res.status(200).json({
            success: true,
            message: "Leave retrieved successfully",
            data:{
                leave,
            }
        })
    }catch(err){
        res.status(500).json({ sucess: false, message: err.message});
    }
};

const getLeavesByStatus = async (req, res) => {
    try{
        const status = req.params.status;
        const leaves = await leaveService.getLeavesByStatus(status);

        if(!leaves){
            res.status().json({
                success: false,
                message: "No leaves found with the given status",
            })
        };

        res.status(200).json({
            success: true,
            message: "Leaves retrieved successfully",
            data:{
                leaves,
                }
        })
    }catch(err){
        res.status(500).json({ sucess: false, message: err.message});
    }
};

const getLeavesByEmployee = async (req, res) => {
    try{
        const employeeId = req.params.id;
        const leaves = await leaveService.getLeavesByEmployee(employeeId);
        if(!leaves){
            res.status().json({
                success: false,
                message: "No leaves found for the given employee",
            })
        };

        res.status(200).json({
            success: true,
            message: "Leaves retrieved successfully",
            data:{
                leaves,
            }
        })
    }catch(err){
        res.status(500).json({ sucess: false, message: err.message});
    }
};

const updateLeave = async (req, res) => {
    try{
        const leaveId = req.params.id;
        const leave = await leaveService.updateLeave(leaveId, req.body);

        if (!leave) {
            res.status().json({
                success: false,
                message: "Leave not found",
            });
        };

        res.status(200).json({
            success: true,
            message: "Leave updated successfully",
            data:{
                leave,
            }
        })
    }catch(err){
        res.status(500).json({ sucess: false, message: err.message});
    }
};


module.exports = {
    createLeaveRequest,
    getLeaveRequests,
    getLeaveById,
    updateLeave,
    getLeavesByStatus,
    getLeavesByEmployee
}
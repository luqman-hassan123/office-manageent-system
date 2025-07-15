const express = require('express');
const router = express.Router();
const {
    createLeaveRequest,
        getLeaveRequests,
        getLeaveById,
        updateLeave,
        getLeavesByStatus,
        getLeavesByEmployee
} = require('../controllers/leaveController');

router.post ('/create', createLeaveRequest);
router.get('/getall', getLeaveRequests);
router.get('/:id', getLeaveById)
router.put('/:id' , updateLeave);
router.get ('/status/:status', getLeavesByStatus);
router.get('/:id', getLeavesByEmployee);

module.exports = router;

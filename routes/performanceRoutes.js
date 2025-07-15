const express = require("express");
const router = express.Router();

const {
    createPerformance,
    getAllPerformance,
    getPerformanceById,
    updatePerformance,
    deletePerformance

} = require("../controllers/performanceController");

router.post("/", createPerformance);
router.get("/" , getAllPerformance );
router.get("/:id" , getPerformanceById);
router.put("/:id" , updatePerformance );
router.delete("/:id" , deletePerformance);

module.exports = router;

const performanceService = require("../services/performanceService");

const createPerformance = async (req, res) => {
  try {
    const performance = await performanceService.createPerformance(req.body);
    res.status(201).json()({
      success: true,
      message: "Performance created successfully",
      data: {
        performance,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error creating performance",
    });
  }
};

const getAllPerformance = async ()  => {
  try {
    const performances = await performanceService.getAllPerformances();
    res.status(201).json()({
      success: true,
      message: "All performances retrieved successfully",
      data: {
        performances,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error retrieving all performances",
    });
  }
};

const getPerformanceById = async (_id) => {
  try {
    const result = await performanceService.getPerformanceById(_id);
    res.status(201).json()({
      success: true,
      message: "Performance by id retrieved successfully",
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error retrieving performance by id",
    });
  }
};

const updatePerformance = async (req, res) => {
  try {
    const result = await performanceService.updatePerformance(req.body);
    res.status(200).json()({
      success: true,
      message: "Performance updated successfully",
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(500).json()({
      success: false,
      message: "Error updating performance",
    });
  }
};

const deletePerformance = async (req, res) => {
  try {
    const result = await performanceService.deletePerformance(req.body);
    res.status(201).json()({
      success: true,
      message: "Performance deleted successfully",
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(500).json()({
      success: false,
      message: "Error deleting performance",
    });
  }
};

module.exports = {
  createPerformance,
  getAllPerformance,
  getPerformanceById,
  updatePerformance,
  deletePerformance,
};

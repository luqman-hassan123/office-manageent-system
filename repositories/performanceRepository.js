const Performance = require("../models/userPerformance");

const createPerformance = (performanceData) => Performance.create (performanceData)

const getAllPerformances = () => Performance.find();

const getPerformanceById = (_id) => performance.findById(_id)

const updatePerformance = (_id, performanceData) => performance.findByIdAndUpdate(_id, performanceData);

const deletePerformance = (_id) => {
  return performance.findByIdAndUpdate(_id, { isDeleted: true }, { new: true });
};

module.exports = {
    createPerformance,
    getAllPerformances,
    getPerformanceById,
    updatePerformance,
    deletePerformance,
}
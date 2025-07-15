const performanceRepository = require ('../repositories/performanceRepository');

const createPerformance = async() =>{
    try{
        const result = await performanceRepository.createPerformance({performanceData})
    return result;
    }catch(err){
        throw new Error ("Error creating performance" + err.message);
    }
} ;

const getAllPerformances = async () => {
    try{
        const result = await performanceRepository.getAllPerformances();
        return result;
    }catch(err){
        throw new Error ("Error getting all performances" + err.message);
    }
};

const getPerformanceById = async (_id) => {
    try{
        const result = await performanceRepository.getPerformanceById(_id);
        return result;
    }catch(err){
        throw new Error ("Error getting performance by id" + err.message);
    }
};

const updatePerformance = async (_id, performanceData) => {
    try{
        const update = await performanceRepository.updatePerformance(_id, performanceData);
        return update;

    }catch(err){
        throw new Error ("Error updating performance" + err.message);
    }
};

const deletePerformance = async (_id) => {
    try{
        const result = await performanceRepository.deletePerformance(_id);
        return result;
    }catch(err){
        throw new Error ("Error deleting performance" + err.message);
    }
};

module.exports = {
    createPerformance,
    getAllPerformances,
    getPerformanceById,
    updatePerformance,
    deletePerformance
}
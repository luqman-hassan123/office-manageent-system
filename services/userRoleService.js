const userRoleRepository = require("../repositories/userRoleRepository");

// create user role
const createRole = async ({name, permission}) => {
    try{
        const role = await userRoleRepository.createRole({name, permission});
        return role;
    }catch(err){
    throw new Error('Error creating role: ' + err.message);
    }
};
//get roles
const getRoles = async () => {
    try{
        const roles = await userRoleRepository.getAllRoles();
        return roles;
    }catch(err){
        throw new Error('Error getting roles: ' + err.message);
    }
};
//get role by name
const getUserRoleByName = async (name) =>{
    try{
        const role = await userRoleRepository.findByName (name);
        return role;
    }catch(err){
        throw new Error('Error getting role by name: ' + err.message);
    }
};
// get user role by id
const getUserRoleById = async (id) =>{
    try{
        const userRole = await userRoleRepository.getUserRoleById(id);
        return userRole;
    }catch(err){
        throw new Error('Error getting user role by id: ' + err.message);
    }
};
// update user role 
const updateRole = async ({name, permission}) =>{
    try{
        const role = await userRoleRepository.updateRole({name, permission});
        return role;
    }catch(err){
        throw new Error('Error updating role: ' + err.message);
    }
};
// delete user role
const deleteRole = async (id) => {
    const role = await userRoleRepository.findbyId(id);
    if(!role){
        throw new Error('Role not found');
    }
    role.isdelete = true;
    await role.save();
    return role;
}
module.exports = {
    createRole,
    updateRole,
    deleteRole,
    getUserRoleByName,
    getUserRoleById,
    getRoles
};
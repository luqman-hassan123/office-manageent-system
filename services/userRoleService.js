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
        console.log("Calling updateRole in repository with:", { name, permission });
        const role = await userRoleRepository.updateRole({name, permission});
        console.log(updateRole)
        return role;
    }catch(err){
        throw new Error('Error updating user role: ' + err.message);
    }
};
// delete user role
const deleteRole = async (id) => {
    const role = await userRoleRepository.getUserRoleById(id);
    if(!role){
        throw new Error('Role not found' + err.message);
    }
    role.isdelete = true;
    await role.save();
    return role;
}
module.exports = {
    createRole,
    updateRole,
    deleteRole,
    getUserRoleById,
    getRoles
};
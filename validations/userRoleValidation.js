const { body } = require('express-validator');

const createValidation = [
    body('roleName').not().isEmpty().withMessage('Role Name is required'),
];

const updateValidation = [
    body('roleName').not().isEmpty().withMessage('Role Name is required to update'),
];

const deleteValidation = [
    body('roleName').not().isEmpty().withMessage('Role Name is required to delete'),
];

module.exports = {
    createValidation,
    updateValidation,
    deleteValidation

};
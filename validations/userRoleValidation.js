const { body } = require('express-validator');

const createValidation = [
    body('name').not().isEmpty().withMessage('Role name is required'),
];

const updateValidation = [
    body('name').not().isEmpty().withMessage('Role name is required to update'),
];

const deleteValidation = [
    body('name').not().isEmpty().withMessage('Role name is required to delete'),
];

module.exports = {
    createValidation,
    updateValidation,
    deleteValidation

};
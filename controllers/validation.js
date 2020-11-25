const { body, validationResult } = require('express-validator');

exports.itemValidators = [
    body('name', 'Name should be longer than 5 characters')
        .notEmpty()
        .withMessage('Name should not be empty')
        .isLength({ min: 5 })
        .trim()
        .escape(),
    body('price').notEmpty(),
    body('qty').notEmpty(),
    body('desc').trim().escape(),
];

exports.categoryValidators = [
    body('name', 'Name should be longer than 5 characters')
        .notEmpty()
        .withMessage('Name should not be empty')
        .isLength({ min: 5 })
        .trim()
        .escape(),
];

exports.validationResult = validationResult;

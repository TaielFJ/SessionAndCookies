const {check, validationResult} = require('express-validator');
 let indexValidations = [
    check('name')
        .notEmpty().withMessage('Campo requerido'),
    check('color')
        .notEmpty().withMessage('Debes elegir un color'),
    check('email')
        .notEmpty().withMessage('debe escribir un email').bail()
        .isEmail().withMessage('Debes escribir un email correcto'),
    check('edad')
        .isAlphanumeric().withMessage('Debes usar números')
 ] 

module.exports = indexValidations;
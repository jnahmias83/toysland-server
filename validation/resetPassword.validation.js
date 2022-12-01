const joi = require("joi");

const resetPasswordSchema = joi.object({
  password: joi.string().required().min(8).max(255),
});
/*
    *trim will remove every space before and after the words
    !trim will not remove space between the words
*/

const resetPasswordValidation = (userData) => {
  return resetPasswordSchema.validateAsync(userData);
};

module.exports = resetPasswordValidation;
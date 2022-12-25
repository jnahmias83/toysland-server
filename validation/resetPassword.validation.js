const joi = require("joi");

const resetPasswordSchema = joi.object({
  password: joi.string().required().min(8).max(255),
});

const resetPasswordValidation = (userData) => {
  return resetPasswordSchema.validateAsync(userData);
};

module.exports = resetPasswordValidation;
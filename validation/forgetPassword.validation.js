const joi = require("joi");

const forgetPasswordSchema = joi.object({
  email: joi.string().email().min(7).max(255).trim().required(),
});

const forgetPasswordValidation = (userData) => {
  return forgetPasswordSchema.validateAsync(userData);
};

module.exports = forgetPasswordValidation;

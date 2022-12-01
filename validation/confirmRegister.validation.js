const joi = require("joi");

const confirmRegisterSchema = joi.object({
  email: joi.string().email().min(7).max(255).trim().required(),
  secretKey: joi
    .string()
    .pattern(/^[0-9a-z]*$/)
    .length(8)
    .trim()
    .required(),
});

const confirmRegisterValidation = (userData) => {
  return confirmRegisterSchema.validateAsync(userData);
};

module.exports = confirmRegisterValidation;

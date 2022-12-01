const joi = require("joi");

const ToySchema = joi.object({
  name: joi.string().required().min(2).max(255).trim(),
  description: joi.string().required().min(2).max(500).trim(),
  category: joi.string().required().min(5).max(255).trim(),
  price: joi.number().required().min(0),
  toyimg: joi.string()
});

const ToyValidation = (toyData) => {
  return ToySchema.validateAsync(toyData);
};

module.exports = { ToyValidation };
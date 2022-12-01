const joi = require("joi");

const cardsSchema = joi.object({
  name: joi.string().required().min(2),
  category: joi.string().required().min(2),
  description: joi.string().required().min(2),
  price: joi.number().required().min(0),
  img: joi.string().required().min(2),
  quantity: joi.number()
});

const cardValidation = (cardData)=> {
    return cardsSchema.validateAsync(cardData);
}

module.exports = cardValidation;

const Joi = require('joi');

const createValidation = Joi.object({
  name: Joi.string().required().min(3).max(50),
  group: Joi.string().required().max(50),
  birthday: Joi.date().required(),
});

const updateValidation = Joi.object({
  name: Joi.string().min(3).max(50),
  group: Joi.string().max(50),
  birthday: Joi.date(),
});

module.exports = {
  createValidation,
  updateValidation,
};

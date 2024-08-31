const Joi = require("joi");

const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().required().email(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@_]{8,20}$")),
    isAdmin: Joi.boolean()
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@_]{8,20}$")),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

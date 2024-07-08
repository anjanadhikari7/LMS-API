import Joi from "joi";

export const newUserValidation = (req, res, next) => {
  try {
    // define schema

    const schema = Joi.object({
      first_name: Joi.string().min(3).required(),
      last_name: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      phone: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      // Bring same respnse helper from last project
      // buildErrorResponse(res,error.message)
      return;
    }

    next();
  } catch (error) {
    console.log("Error", error);
  }
};

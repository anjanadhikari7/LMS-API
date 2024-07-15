import Joi from "joi";
import { buildErrorResponse } from "../utility/responseHelper.js";

const STRING_REQUIRED = Joi.string().required();

export const newBookValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      thumbnail: STRING_REQUIRED,
      title: STRING_REQUIRED,
      author: STRING_REQUIRED,
      publish_year: STRING_REQUIRED,
      isbn: STRING_REQUIRED,
      description: Joi.string().max(3000).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return buildErrorResponse(res, error.message);
    }
    next();
  } catch (error) {
    return buildErrorResponse(res, error.message);
  }
};

export const updateBookValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      id: STRING_REQUIRED,
      thumbnail: STRING_REQUIRED,
      title: STRING_REQUIRED,
      author: STRING_REQUIRED,
      publish_year: STRING_REQUIRED,
      isbn: STRING_REQUIRED,
      description: Joi.string().max(5000).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return buildErrorResponse(res, error.message);
    }

    next();
  } catch (error) {
    buildErrorResponse(res, error.message);
  }
};

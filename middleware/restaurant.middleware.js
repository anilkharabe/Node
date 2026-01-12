const Joi = require("joi");

const createRestaurantSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Restaurant name is required",
      "string.min": "Restaurant name must be at least 2 characters",
    }),

  cloudinaryImageId: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Image ID is required",
    }),

  cuisines: Joi.array()
    .items(Joi.string().trim())
    .min(1)
    .required()
    .messages({
      "array.base": "Cuisines must be an array",
      "array.min": "At least one cuisine is required",
    }),

  avgRating: Joi.number()
    .min(0)
    .max(5)
    .optional()
    .messages({
      "number.base": "Rating must be a number",
      "number.max": "Rating cannot exceed 5",
    }),

  deliveryTime: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Delivery time must be a number",
      "number.min": "Delivery time must be at least 1 minute",
    }),
});

module.exports = {
  createRestaurantSchema,
};

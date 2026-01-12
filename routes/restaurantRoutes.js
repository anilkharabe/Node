const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware')
const authorizeRoles = require('../middleware/role.middleware');
const { createRestaurantSchema } = require('../middleware/restaurant.middleware')
const { updateRestaurantSchema } = require('../middleware/updateRestaurant.middleware')
const joiValidator = require('../middleware/joiValidator.middleware');

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");

// USER ROUTES
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);

// ADMIN ROUTES (add auth middleware later)
router.post("/", joiValidator(createRestaurantSchema), authMiddleware, authorizeRoles(['admin']), createRestaurant);
router.put("/:id", joiValidator(updateRestaurantSchema), authMiddleware, authorizeRoles(['admin']), updateRestaurant);
router.delete("/:id", authMiddleware, authorizeRoles(['admin']), deleteRestaurant);

module.exports = router;

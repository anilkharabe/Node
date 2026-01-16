const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware')
const authorizeRoles = require('../middleware/role.middleware');
const { createRestaurantSchema } = require('../middleware/restaurant.middleware')
const { updateRestaurantSchema } = require('../middleware/updateRestaurant.middleware')
const joiValidator = require('../middleware/joiValidator.middleware');
const excelUpload = require('../middleware/excel.middleware')

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  bulkUploadRestaurants
} = require("../controllers/restaurantController");

// USER ROUTES
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);

// ADMIN ROUTES (add auth middleware later)
router.post("/",  authMiddleware, authorizeRoles(['admin']), joiValidator(createRestaurantSchema),  createRestaurant);
router.put("/:id",  authMiddleware, authorizeRoles(['admin']), joiValidator(updateRestaurantSchema), updateRestaurant);
router.delete("/:id", authMiddleware, authorizeRoles(['admin']), deleteRestaurant);
router.post("/bulk-upload", authMiddleware, authorizeRoles(['admin']), excelUpload.single('file'), bulkUploadRestaurants);

module.exports = router;

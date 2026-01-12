const Restaurant = require("../models/Restaurant");

/* ----------------------------------
   ADMIN: Create Restaurant
----------------------------------- */
exports.createRestaurant = async (req, res) => {
  try {
    const {
      name,
      cloudinaryImageId,
      cuisines,
      avgRating,
      deliveryTime,
    } = req.body;

    if (!name || !cloudinaryImageId || !cuisines || !deliveryTime) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const restaurant = await Restaurant.create({
      name,
      cloudinaryImageId,
      cuisines,
      avgRating,
      deliveryTime,
    });

    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create restaurant",
      error: error.message,
    });
  }
};

/* ----------------------------------
   USER: Get All Restaurants
----------------------------------- */
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ isActive: true });

    res.status(200).json({
      count: restaurants.length,
      restaurants,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch restaurants",
      error: error.message,
    });
  }
};

/* ----------------------------------
   USER: Get Restaurant by ID
----------------------------------- */
exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id);

    if (!restaurant || !restaurant.isActive) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch restaurant",
      error: error.message,
    });
  }
};

/* ----------------------------------
   ADMIN: Update Restaurant
----------------------------------- */
exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update restaurant",
      error: error.message,
    });
  }
};

/* ----------------------------------
   ADMIN: Soft Delete Restaurant
----------------------------------- */
exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete restaurant",
      error: error.message,
    });
  }
};

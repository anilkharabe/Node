const Restaurant = require("../models/Restaurant");
const XLSX = require("xlsx");

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


exports.bulkUploadRestaurants = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read Excel
    const workbook = XLSX.read(req.file.buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    if (!rows.length) {
      return res.status(400).json({ message: "Empty Excel file" });
    }

    const restaurants = rows.map((row, index) => {
      
      if (!row.name || !row.cloudinaryImageId || !row.deliveryTime) {
        throw new Error(`Invalid data at row ${index + 2}`);
      }

      return {
        name: row.name,
        cloudinaryImageId: row.cloudinaryImageId,
        cuisines: row.cuisines
          ? row.cuisines.split(",").map(c => c.trim())
          : [],
        avgRating: row.avgRating || 0,
        deliveryTime: Number(row.deliveryTime),
      };
    });

    await Restaurant.insertMany(restaurants);

    res.status(201).json({
      message: "Restaurants uploaded successfully",
      count: restaurants.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Bulk upload failed",
      error: error.message,
    });
  }
};



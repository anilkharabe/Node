const Restaurant = require("../models/Restaurant");
const User = require("../models/user.model");

exports.getAdminStats = async (req, res) => {
  try {
    const [restaurantCount, userCount] = await Promise.all([
      Restaurant.countDocuments({ isActive: true }),
      User.countDocuments({role: "user"}),
    ]);

    res.json({
      restaurants: restaurantCount,
      users: userCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch admin stats",
      error: error.message,
    });
  }
};

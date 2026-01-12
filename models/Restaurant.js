const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    cloudinaryImageId: {
      type: String,
      required: true,
    },

    cuisines: {
      type: [String],
      required: true,
    },

    avgRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    deliveryTime: {
      type: Number, // in minutes
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);

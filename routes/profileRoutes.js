const express = require("express");
const router = express.Router();
const {
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
} = require("../controllers/profile.controller");

// post: for adding the data in users
router.post("/", createProfile);

// get: Read single user by id as params
router.get("/:id", getProfileById);

//put: update the user by id as params
router.put("/:id", updateProfile);

// delete: delete the user by id as params
router.delete("/:id", deleteProfile);

module.exports = router;

const Profile = require("../models/profile.model");
const User = require('../models/user.model')
const createProfile = async (req, res) => {
  try {
    const profileRes = await Profile.create(req.body); // data in going to save in db, so it will take time
    
    //req.body.userId
    await User.findByIdAndUpdate(req.body.userId, {profileId: profileRes._id})
    res.status(200).json(profileRes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    // updated user should return the updated value : currently getting older value
    const updateProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json(updateProfile);

    if (!updateProfile || updateProfile === null) {
      return res.status(404).json({ message: "Profile Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProfile = async (req, res) => {
  const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedProfile);
};

module.exports = {
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
};

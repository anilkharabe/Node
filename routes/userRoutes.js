
const express = require('express');
const router = express.Router()
const User = require('../models/user.model');
// post: for adding the data in users
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const userRes = await User.create({ name, email }); // data in going to save in db, so it will take time

    res.status(200).json(userRes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get: Read all the users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get: Read single user by id as params
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//put: update the user by id as params
router.put("/:id", async(req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(updateUser);
    console.log('updateUser', updateUser);

    if(!updateUser || updateUser === null){
        return res.status(404).json({message: "User Not Found"})
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// delete: delete the user by id as params

router.delete("/:id", async(req, res) => {

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedUser);

});

module.exports = router;
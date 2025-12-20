const express = require("express");
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser} = require("../controllers/user.controller");

// post: for adding the data in users
router.post("/", createUser);

// get: Read all the users
router.get("/", getUsers);

// get: Read single user by id as params
router.get("/:id", getUserById);

//put: update the user by id as params
router.put("/:id", updateUser);

// delete: delete the user by id as params
router.delete("/:id", deleteUser);

module.exports = router;

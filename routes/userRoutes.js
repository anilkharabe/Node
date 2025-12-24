const express = require("express");
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser, login, accessMyProfile} = require("../controllers/user.controller");
const authMiddleware = require('../middleware/auth.middleware')
const createValidationMiddleware = require('../middleware/createUser.middleware')
const updateValidationMiddleware = require('../middleware/updateUser.middleware')

// post: for adding the data in users
router.post("/", createValidationMiddleware, createUser);

// get: Read all the users
router.get("/", getUsers);

// get: Read single user by id as params
router.get("/:id", getUserById);

//put: update the user by id as params
router.put("/:id", updateValidationMiddleware, updateUser);

// delete: delete the user by id as params
router.delete("/:id", deleteUser);

router.post('/login', login)

router.post('/accessMyProfile', authMiddleware, accessMyProfile) // routing based middleware

module.exports = router;

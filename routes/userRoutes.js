const express = require("express");
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser, login, accessMyProfile} = require("../controllers/user.controller");
const authMiddleware = require('../middleware/auth.middleware')
const joiValidator = require('../middleware/joiValidator.middleware');
const { updateUserSchema } = require('../middleware/updateUser.middleware')
const { createUserSchema } = require('../middleware/createUser.middleware')
const authorizeRoles = require('../middleware/role.middleware')


// post: for adding the data in users
router.post("/", joiValidator(createUserSchema), createUser);

// get: Read all the users
router.get("/", getUsers);

// get: Read single user by id as params
router.get("/:id", getUserById);

//put: update the user by id as params
router.put("/:id", joiValidator(updateUserSchema), updateUser);

// delete: delete the user by id as params
// public api =>
router.delete("/:id", authMiddleware, authorizeRoles(['admin']),   deleteUser);

router.post('/login', login)

router.post('/accessMyProfile', authMiddleware, accessMyProfile) // routing based middleware

module.exports = router;

const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../controllers/adminController");
const authMiddleware = require('../middleware/auth.middleware')
const authorizeRoles = require('../middleware/role.middleware');

// later: verifyToken, isAdmin
router.get("/stats", authMiddleware, authorizeRoles(['admin']), getAdminStats);

module.exports = router;

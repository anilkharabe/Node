const express = require("express");
const router = express.Router();
const { createOrder, getOrders} = require("../controllers/order.controller");

// post: for adding the data in users
router.post("/", createOrder);

// get: Read all the users
router.get("/", getOrders);


module.exports = router;

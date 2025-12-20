const Order = require('../models/order.model');
const createOrder = async (req, res) => {
  try {
   
    const orderRes = await Order.create( req.body ); // data in going to save in db, so it will take time

    res.status(200).json(orderRes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
    createOrder,
    getOrders
}
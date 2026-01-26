const mongoose = require("mongoose");

// 1. establish connection with mongo db

const connectDB = async()=>{
    mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log("MongoDB connection error"));
}

module.exports = connectDB;

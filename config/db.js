const mongoose = require("mongoose");

// 1. establish connection with mongo db

const connectDB = async()=>{
    mongoose
    .connect("mongodb://127.0.0.1:27017/test")
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log("MongoDB connection error"));
}

module.exports = connectDB;

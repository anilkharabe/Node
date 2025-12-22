const mongoose = require("mongoose");
//2.  Create Schema
const profileSchema = new mongoose.Schema({
  bio: String,
  dob: Date,
  phone: Number,

  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
//   timestamps: true,
//   versionKey: false
});
// 3. Create Model
module.exports = mongoose.model("Profile", profileSchema);
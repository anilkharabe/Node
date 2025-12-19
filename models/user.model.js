const mongoose = require("mongoose");
//2.  Create Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
// 3. Create Model
module.exports = mongoose.model("User", userSchema);
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

  password:{
    type: String,
    required: true
  },
  
  profileId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile"
  }
});
// 3. Create Model
module.exports = mongoose.model("User", userSchema);
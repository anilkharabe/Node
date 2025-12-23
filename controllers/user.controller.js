const User = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userRes = await User.create({ name, email, password: hashedPassword }); // data in going to save in db, so it will take time
    
    delete userRes.password; // password is not deleted here// need to delete password
    
    res.status(200).json(userRes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const updateUser = async(req, res) => {
  try {

    // updated user should return the updated value : currently getting older value
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(updateUser);

    if(!updateUser || updateUser === null){
        return res.status(404).json({message: "User Not Found"})
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const deleteUser = async(req, res) => {

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedUser);

}

//protected route
const accessMyProfile = async(req, res) =>{
  
  // logic - post authentication logic
  
    res.json({
    message: 'This is protected..... And you are with valid credentials so you can access this API',
  })

}

const login = async(req, res) =>{
  const {email, password} = req.body;

  const user = await User.findOne({email: email});

  if(!user){
      res.json({
      message:"Invalid credentials"
    }) 
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(isPasswordValid){

    const token = jwt.sign({userId: user._id}, 'secret_key', {expiresIn: '1hr'})

    res.json({
      message:"login successfully",
      token
    }) 
  }else{
    res.json({
      message:"Invalid credentials"
    })
  }
}


module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    login,
    accessMyProfile
}



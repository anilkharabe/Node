const User = require('../models/user.model');
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const userRes = await User.create({ name, email }); // data in going to save in db, so it will take time

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
    console.log('updateUser', updateUser);

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


module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}



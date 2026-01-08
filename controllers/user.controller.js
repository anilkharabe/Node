const User = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const xlsx = require('xlsx')
const emailService = require('../src/email/email.service')

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userRes = await User.create({ name, email, password: hashedPassword, role }); // data in going to save in db, so it will take time
    
    delete userRes.password; // password is not deleted here// need to delete password
    
    // await emailService.sendEmail({to:email, subject:'Welcome to node js: my app', templateName: 'welcome', data:{name, email}})

    res.status(200).json(userRes);
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ message: error.message });
  }
}


// heavy task = 5 seconds
const getUsers = async (req, res) => {
  try {
    const start = Date.now();

    // BLOCK the event loop for 5 seconds
    while (Date.now() - start < 5000) {
      // busy wait
    }

    const users = await User.find();
    res.status(200).json(users);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// time = -.05 ms
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
    console.log("req.body from accessmyProfile", req.body)
  
    res.json({
    message: 'This is protected..... And you are with valid credentials so you can access this API',
  })

}

const login = async(req, res) =>{
  const {email, password} = req.body;

  // 1. user not found
  const user = await User.findOne({email: email});

  if(!user){
      return res.json({
      message:"Invalid credentials"
    }) 
  }
  // bcrypy => return true/ false 
  const isPasswordValid = await bcrypt.compare(password, user.password)
  //2. user is valid, email and password is correct
  
  if(isPasswordValid){

    const token = jwt.sign({userId: user._id, role: user.role}, 'secret_key', {expiresIn: '1hr'})

    res.json({
      message:"login successfully",
      accessToken: token,
      user
    }) 
  }else{
    //3. password is wrong
    res.json({
      message:"Invalid credentials, password is wrong"
    })
  }
}

const uploadUserFromExcel = async(req, res)=>{
  try {
    // console.log("req.file", req.file)
    
    if(!req.file){
      return res.status(400).json({message:"Excel file is required"})
    }
    
    // Read workbook(entire file)
    const workbook = xlsx.read(req.file.buffer, {type: 'buffer'})
    // console.log('workbook', workbook)


    // read Sheet
    const sheetName = workbook.SheetNames[0];
    // console.log('sheetName', sheetName)

    //reading data from sheet
    const sheet =  workbook.Sheets[sheetName];
    // console.log('sheet', sheet)


    // converting data into json
    const rows = xlsx.utils.sheet_to_json(sheet)
    // console.log('rows', rows)

    if(rows.length ===0){
      return res.status(400).json({message:"Excel file is empty"})
    }

    const userList = await Promise.all(
      rows.map(async(row)=>({
        name: row.name,
        email: row.email,
        password: await bcrypt.hash(row.password, 10),
        role: row.role,
      }))
    )

    await User.insertMany(userList, {ordered: false})


    res.status(200).json({message:"uploaded successfully", totalInserted: userList.length})
  } catch (error) {
    res.status(500).json({
      message: 'Excel upload failed',
      error: error.message
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
    accessMyProfile,
    uploadUserFromExcel
}



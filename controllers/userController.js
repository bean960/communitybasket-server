const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require("express-async-handler")
const User = require('../model/userModel')
//@desc Register new user 
// @routes post /api /users
// @access public
const registerUser = asyncHandler ( async (req, res) =>{
     
     const {userName,password} = req.body
     if(!userName || !password) {
         res.status(400)
         throw new Error('Please add fields')
     }

     const userExists = await User.findOne({userName})
     if(userExists) {
         res.status(400)
         throw new Error ('User Already Exists')
     }
     // hash password
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt)
     //create user 

     const user = await User.create({
         userName,
         password: hashedPassword,
     })

      if(user){
          res.status(200).json({
          _id: user.id,
          userName: user.userName,
          token: generateToken(user._id)
          })
         
      }
      else{
          res.status(400)
          throw new Error('Invalid user data ')
      }
     
})
//@desc auth user 
// @routes post /api /users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { userName, password } = req.body
  
    // Check for user email
    const user = await User.findOne({userName})
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        userName: user.userName,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')

    }
  })
//@desc get user 
// @routes get /api /user/me
// @access private
const getMe = asyncHandler( async (req, res) =>{
    const{_id, userName} =await User.findById(req.user.id) 
    res.status(200).json({
        id: _id,
        userName
    })
})


//genarate jwt
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,loginUser,getMe
}
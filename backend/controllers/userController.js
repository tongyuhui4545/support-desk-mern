const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel'); 


//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}


//@desc Register a new user
//@route /api/users
//@access Public

const registerUser = asyncHandler(async(req, res) => { 
  const {name, email, password} = req.body

  //Validation
  if(!name || !email || !password) {
    res.status(400).json({msg: 'Please enter all fields'})
    throw new Error( 'Please enter all fields')
  }

  //Check if user exists
  const userExists = await User.findOne({email})

  if(userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  //Hash password
 const salt = await bcrypt.genSalt(10)
 const hashedPassword = await bcrypt.hash(password, salt)

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if(user) {  
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new error('Invalid user data')
  }
})


//@desc Log in a new user
//@route /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => { console.log('guagaugaus', req.body);


   const {email, password} = req.body
   const user = await User.findOne({email}); console.log('restuuult', user);

   if(!user) {
    res.status(401)
    throw new Error('Not such a user')
   }

   else {
    let match = await bcrypt.compare(password, user.password)
    if(user && match) {
      res.status(200).json({
       _id: user.id,
       name: user.name,
       email: user.email,
       token: generateToken(user._id)
      })          
    }
    else {
      res.status(401)
      throw new Error('Invalid credentials')
    }
   }
})

//@desc get current user
//@route /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => { 

  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  }
  res.status(200).json(user)
})


module.exports = { registerUser, loginUser, getMe }
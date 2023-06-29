const jwt = require('jsonwebtoken');
const USER = require('../model/user');

const authen = async (req,res,next) =>{
  try{
    const token = req.cookies.jwtoken
    const verifyToken = jwt.verify(token,process.env.JWT_SECRET)
    const rootUser = await USER.findOne({_id: verifyToken._id, "tokens.token": token})
    if(!rootUser){
      throw new Error('User does not exist')
    }
    req.token = token
    req.rootUser = rootUser
    req.userID = rootUser._id
    next()
  }catch(err){
    res.status(401).send('Not authorized: No token available')
    console.log(err)
  }
}

module.exports = authen;
const express=require("express");
const router=express.Router();
const User=require('../model/user');
const authen=require('../midddleware/auth');
const cookieParser=require('cookie-parser')
router.use(cookieParser())

router.post('/signup',async(req, res) => {
    const { email, password,password2,username } = req.body;
    try {
        const ifuserexist = await User.findOne({email})
        if (ifuserexist) {
            return res.status(400).json({message:"User already exist"})
        }
        else{
            const user = new User({email, password,password2,username })
            await user.save()
            console.log("Login ho gayl bane");     
        }        
    } catch (error) {
    }
})



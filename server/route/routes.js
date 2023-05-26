const express=require("express");
const asyncHandler = require("express-async-handler");
const router=express.Router();
const USER=require('../model/user');
const authen=require('../midddleware/auth');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.post("/signup", asyncHandler(async (req, res) => {
    const { username, email, password, password2 } = req.body;
    if (!username || !email || !password || !password2) {
      return res.status(403).json({ error: "Fill in fields missing" });
    }
    try {
      const userExists = await USER.findOne({ email: email });
      if (userExists) {
        return res.status(422).json({ error: "User already exists" });
      } else if (password !== password2) {
        return res.status(422).json({ error: "Password do not match" });
      } else {
        const user = new USER({
          username,
          email,
          password,
          password2,
        });
        await user.save();
      }
      res.status(201).json({ message: "User registered" });
    } catch (err) {
      console.log(err);
    }
}));

router.post('/login',asyncHandler(async(req,res)=>{
    try {
        let token;
        const { username, password } = req.body;
        if (!username || !password) {
          return res.status(400).json({ error: "Please fill in fields" });
        }
        let checkUserExist = await USER.findOne({username});
        if (checkUserExist) {
          if (password !== checkUserExist.password) {
            return res.status(400).json({ msg: "Invalid credentials" });
          }
          token = await checkUserExist.generateAuthToken();
          checkUserExist.tokens.push({ token });
          await checkUserExist.save();
          res.header("Access-Control-Allow-Credentials", true);
          res.cookie("jwtoken", token, {
            maxAge: 99999999999,
            httpOnly: false,
            SameSite: "Lax",
          });
          res.status(200).json({ message: "User signed in" });
        } else {
          res.status(400).json({ message: "Invalid credentials" });
        }
      } catch (err) {
        console.log(err);
      }
}))

module.exports = router;



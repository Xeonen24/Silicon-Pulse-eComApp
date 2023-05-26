const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
   username: {
       type: String,
       trim: true,
       required : [true, 'Enter your username'],
       maxlength: 16
   },
   email: {
       type: String,
       trim: true,
       required : [true, 'Enter a E-mail'],
       unique: true,
   },
   password: {
       type: String,
       trim: true,
       required : [true, 'Please add a Password'],
       minlength: [4, 'password must have at least four(4) characters'],
   },
   password2: {
    type: String,
    trim: true,
    required : [true, 'Please add a Password'],
    minlength: [4, 'password must have at least four(4) characters'],
    },
    tokens:[
        {
            token:{
                type: String,
                required:true
            }
        }
    ],
   isAdmin:{
    type: Boolean,
    required: true,
    default: false,
   },

}, {timestamps: true});

userSchema.methods.generateAuthToken = async function () {
    try{
        let token =  jwt.sign({_id:this._id},process.env.JWT_SECRET)
        this.token = this.tokens.concat({token:token})
        await this.save()
        return token
    }catch(err){
        console.log(err)
    }
}

const User = mongoose.model('USER',userSchema);
module.exports = User; 
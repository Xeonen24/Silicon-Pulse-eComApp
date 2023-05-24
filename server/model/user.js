const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');

const usersSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    password2:{
        type:String,
        require:true,
    },
    tokens:[
        {
            token:{
                type:String,
            }
        }
    ],
    admin:{
        type:Boolean,
        default:false,
    }

},{timestamps: true});

usersSchema.methods.generateAuthToken = async function () {
    try{
        let token =  jwt.sign({_id:this._id},process.env.JWT_SECRET)
        this.token = this.tokens.concat({token:token})
        await this.save()
        return token
    }catch(err){
        console.log(err)
    }
}

const User = mongoose.model('USER',usersSchema);
module.exports = User;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userSchema = new mongoose.Schema({
   username: {
       type: String,
       trim: true,
       required: [true, 'Please enter your username'],
       maxlength: 16,
       unique: true
   },
   email: {
       type: String,
       trim: true,
       required: [true, 'Please enter an email'],
       unique: true,
       validate: {
        validator: function (value) {
            return validator.isEmail(value);
        },
        message: 'Please enter a valid email'
    }
   },
   password: {
       type: String,
       trim: true,
       required: [true, 'Please add a password'],
       minlength: [4, 'Password must have at least four(4) characters'],
   },
   tokens: [
       {
           token: {
               type: String,
               required: true
           }
       }
   ],
   cart: [{
    product: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Product"
    },
    quantity: {
       type: Number,
       default: 1
    }
 }],
   role: {
       type: String,
       enum: ['admin', 'user'],
       default: 'user'
   }
}, { timestamps: true });

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const User = mongoose.model('User', userSchema);
module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ratingAndReviews = Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",      
    },
    rating : {
        type: Number,
        required: true,
    },
    review : {
        type: String,
        required: true,
    },
    product : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Rating", ratingAndReviews);

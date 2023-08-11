// product.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  productCode: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
    path: "public/images",
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountprice: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  manufacturer: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
    defaultValue:1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating",
    },
  ],

});

module.exports = mongoose.model("Product", productSchema);

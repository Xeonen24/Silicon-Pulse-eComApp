const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = Schema({
    name: {
        type: String,
      },
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zip: {
        type: Number,
        default:null,
      },
      country:{
        type: String,
      },
      totalPrice:{
        type: Number,
        default:null,
      },
      // paymentMethod:{
      //   type: String,
      // },
      // products:[{
      //   product: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "Product",
      //   },
      // }],
});

module.exports = mongoose.model("Address", addressSchema);

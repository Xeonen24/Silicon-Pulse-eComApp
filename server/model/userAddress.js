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
});

module.exports = mongoose.model("Address", addressSchema);

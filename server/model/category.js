const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  type: { type: String, enum: ['Processors', 
    'RAMs', 
    'Motherboards', 
    'Storage Drives', 
    'Graphic Cards', 
    'Power supplies', 
    'Peripherals'], required: true },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

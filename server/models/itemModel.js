const mongoose = require('mongoose');

// Defines the schema for inventory items
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  // add more fields later here if needed
  description: {
    type: String,
    required: false, // might or might not need this
  },
  createdAt: {
    type: Date,
    default: Date.now, // set the date when the item is created
  },
});

// Creates the model from the schema
const Item = mongoose.model('Item', itemSchema);

// Exports the model
module.exports = Item;
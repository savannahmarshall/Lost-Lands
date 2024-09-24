const { Schema, model } = require('mongoose');
const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {  
    type: String,
    required: true, 
  },
  
});


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  inventory: [itemSchema]
});

const User = model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
  fullName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  cattleName: {
    type: String,
    required: true
  },
  cattleType: {
    type: String,
    required: true
  },
  cattlePhoto: String,
  medicineName: {
    type: String,
    required: true
  },
  medicineGivenDate: {
    type: Date,
    required: true
  },
  medicineEndDate: {
    type: Date,
    required: true
  },
  nextMedicineDate: {
    type: Date,
    required: true
  },
  medicinePhoto: String
});

module.exports = mongoose.model('Animal', animalSchema);

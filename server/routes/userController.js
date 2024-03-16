const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../middleware/authMiddleware');
const User = require('../models/userModel');
const Animal = require('../models/animalModal');
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({ // multer disk storage settings
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      const datetimestamp = Date.now();
      cb(null, datetimestamp + '-' + file.originalname);
    }
  })
}).fields([
  { name: 'cattlePhoto', maxCount: 1 },
  { name: 'medicinePhoto', maxCount: 1 },
]);

router.post('/register', async (req, res) => {
  try {
    const { fullName, age, gender, mobileNo } = req.body;

    // Create new user
    const user = new User({
      fullName,
      age,
      gender,
      mobileNo
    });

    // Save user to database
    await user.save();

    res.status(201).json({ message: 'Registration successful' });
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});



router.post('/login', async (req, res) => {
  try {
    const { fullName, mobileNo } = req.body;

    // Check if user exists
    const user = await User.findOne({ fullName, mobileNo });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successfull' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/animalDetails', (req, res) => {
  upload(req, res, async (err) => {
      try {
          if (err) {
              throw new Error('Error uploading files: ' + err.message);
          }

          const { cattleName, cattleType, medicineName, medicineGivenDate, medicineEndDate, nextMedicineDate } = req.body;

          // Parse date strings to Date objects
          const parsedMedicineGivenDate = new Date(medicineGivenDate);
          const parsedMedicineEndDate = new Date(medicineEndDate);
          const parsedNextMedicineDate = new Date(nextMedicineDate);

          // Check if the parsed dates are valid
          if (isNaN(parsedMedicineGivenDate.getTime()) || isNaN(parsedMedicineEndDate.getTime()) || isNaN(parsedNextMedicineDate.getTime())) {
              throw new Error('Invalid date format');
          }

          // Check if req.files exists and has the expected properties
          if (!req.files || !req.files['cattlePhoto'] || !req.files['medicinePhoto']) {
              throw new Error('Both cattle photo and medicine photo are required.');
          }

          const cattlePhoto = req.files['cattlePhoto'][0].path;
          const medicinePhoto = req.files['medicinePhoto'][0].path;

          const animal = new Animal({
              cattleName,
              cattleType,
              cattlePhoto,
              medicineName,
              medicineGivenDate: parsedMedicineGivenDate,
              medicineEndDate: parsedMedicineEndDate,
              nextMedicineDate: parsedNextMedicineDate,
              medicinePhoto,
          });

          await animal.save();
          console.log("Saved Details of Animals in the database");

          res.status(200).json({
              message: "Animal details saved successfully",
              animal // You can include the entire animal object in the response if needed
          });
      } catch (error) {
          console.error("Failed to Save:", error);
          res.status(500).json({ error: error.message });
      }
  });
});




router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching user' });
  }
});



router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching users' });
  }
});


module.exports = router;
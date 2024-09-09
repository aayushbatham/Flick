const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');  // Corrected import for JWT
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashPassword
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(201).json({ message: 'Registered Successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token in a cookie or in the response body
    res.cookie('authToken', token, { httpOnly: true });
    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('authToken');
  return res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;

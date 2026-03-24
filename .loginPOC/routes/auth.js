const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login page
router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('login', { user: null });
});

// Signup page
router.get('/signup', (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('signup', { user: null });
});

// Login POST
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.render('login', { user: null, error: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('login', { user: null, error: 'Invalid email or password' });
    }

    // Check if active
    if (!user.isActive) {
      return res.render('login', { user: null, error: 'Account is deactivated' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Set session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', { user: null, error: 'Server error' });
  }
});

// Signup POST
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (password !== confirmPassword) {
      return res.render('signup', { user: null, error: 'Passwords do not match' });
    }

    if (password.length < 8) {
      return res.render('signup', { user: null, error: 'Password must be at least 8 characters' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.render('signup', { user: null, error: 'Email already registered' });
    }

    // Create user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password
    });

    await user.save();

    res.render('login', { user: null, success: 'Account created successfully! Please log in.' });
  } catch (error) {
    console.error('Signup error:', error);
    res.render('signup', { user: null, error: 'Server error' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});

module.exports = router;
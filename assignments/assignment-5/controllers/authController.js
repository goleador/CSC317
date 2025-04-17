/**
 * Authentication Controller
 * Handles the logic for user registration, login, and logout
 */
const { validationResult } = require('express-validator');
const User = require('../models/User');

/**
 * Display registration form
 */
exports.getRegister = (req, res) => {
  res.render('auth/register', {
    title: 'Register',
    errors: []
  });
};

/**
 * Process registration form submission
 */
exports.postRegister = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('auth/register', {
        title: 'Register',
        errors: errors.array(),
        formData: {
          username: req.body.username,
          email: req.body.email
        }
      });
    }

    // Create new user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    // Save user to database
    await user.save();

    // Redirect to login page with success message
    req.session.flashMessage = { 
      type: 'success', 
      text: 'Registration successful! You can now log in.' 
    };
    res.redirect('/auth/login');
  } catch (error) {
    next(error);
  }
};

/**
 * Display login form
 */
exports.getLogin = (req, res) => {
  // Get flash message from session if it exists
  const flashMessage = req.session.flashMessage;
  // Clear flash message from session
  delete req.session.flashMessage;
  
  res.render('auth/login', {
    title: 'Login',
    errors: [],
    flashMessage
  });
};

/**
 * Process login form submission
 */
exports.postLogin = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('auth/login', {
        title: 'Login',
        errors: errors.array(),
        formData: {
          email: req.body.email
        }
      });
    }

    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    
    // Check if user exists
    if (!user) {
      return res.status(401).render('auth/login', {
        title: 'Login',
        errors: [{ msg: 'Invalid email or password' }],
        formData: {
          email: req.body.email
        }
      });
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(req.body.password);
    if (!isPasswordValid) {
      return res.status(401).render('auth/login', {
        title: 'Login',
        errors: [{ msg: 'Invalid email or password' }],
        formData: {
          email: req.body.email
        }
      });
    }
    
    // Set user session (don't include password in the session)
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email
    };
    
    // Redirect to originally requested URL or profile page
    const redirectUrl = req.session.returnTo || '/user/profile';
    delete req.session.returnTo;
    
    res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

/**
 * Process user logout
 */
exports.logout = (req, res) => {
  // Destroy the session
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    // Redirect to home page
    res.redirect('/');
  });
};
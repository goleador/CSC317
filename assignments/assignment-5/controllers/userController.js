/**
 * User Controller
 * Handles logic for user-related pages and actions
 */
const User = require('../models/User');

/**
 * Display user profile page
 */
exports.getProfile = (req, res) => {
  res.render('user/profile', {
    title: 'Profile',
    user: req.session.user
  });
};

/**
 * Display user settings page
 */
exports.getSettings = (req, res) => {
  res.render('user/settings', {
    title: 'Settings',
    user: req.session.user,
    errors: []
  });
};

/**
 * Update user settings
 */
exports.updateSettings = async (req, res, next) => {
  try {
    // Get user ID from session
    const userId = req.session.user.id;
    
    // Find user in database
    const user = await User.findById(userId);
    
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    
    // Update username if provided and different
    if (req.body.username && req.body.username !== user.username) {
      // Check if username is already taken
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).render('user/settings', {
          title: 'Settings',
          user: req.session.user,
          errors: [{ msg: 'Username is already taken' }]
        });
      }
      
      user.username = req.body.username;
      // Update session data
      req.session.user.username = req.body.username;
    }
    
    // Save changes
    await user.save();
    
    // Render settings page with success message
    res.render('user/settings', {
      title: 'Settings',
      user: req.session.user,
      errors: [],
      flashMessage: {
        type: 'success',
        text: 'Settings updated successfully'
      }
    });
  } catch (error) {
    next(error);
  }
};
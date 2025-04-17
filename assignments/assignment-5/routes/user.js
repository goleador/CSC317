/**
 * User routes
 * Handles protected routes that require authentication
 */
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');

// Controller imports
const userController = require('../controllers/userController');

// All routes in this file require authentication
router.use(isAuthenticated);

// GET /user/profile - User profile page
router.get('/profile', userController.getProfile);

// GET /user/settings - User settings page
router.get('/settings', userController.getSettings);

// POST /user/settings - Update user settings
router.post('/settings', userController.updateSettings);

module.exports = router;
/**
 * Authentication routes
 * Handles user registration, login, and logout
 */
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { isNotAuthenticated } = require('../middlewares/auth');

// Controller imports
const authController = require('../controllers/authController');

// Registration form validation rules
const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers')
    .custom(async value => {
      const existingUser = await User.findOne({ username: value });
      if (existingUser) {
        throw new Error('Username is already taken');
      }
      return true;
    }),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail()
    .custom(async value => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new Error('Email is already registered');
      }
      return true;
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
    .withMessage('Password must include at least one uppercase letter, one lowercase letter, and one number'),
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

// Login form validation rules
const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// GET /auth/register - Show registration form
router.get('/register', isNotAuthenticated, authController.getRegister);

// POST /auth/register - Process registration form
router.post('/register', isNotAuthenticated, registerValidation, authController.postRegister);

// GET /auth/login - Show login form
router.get('/login', isNotAuthenticated, authController.getLogin);

// POST /auth/login - Process login form
router.post('/login', isNotAuthenticated, loginValidation, authController.postLogin);

// GET /auth/logout - Logout user
router.get('/logout', authController.logout);

module.exports = router;
/**
 * Index routes
 * Handles public routes that don't require authentication
 */
const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Home',
    message: 'Welcome to the Authentication Template'
  });
});

// About page route
router.get('/about', (req, res) => {
  res.render('about', { 
    title: 'About',
    message: 'Learn about this application'
  });
});

module.exports = router;
/**
 * Authentication middleware
 * Provides functions to protect routes that require authentication
 */

// Middleware to check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    // User is authenticated, proceed to the next middleware
    return next();
  }
  
  // User is not authenticated, redirect to login page
  req.session.returnTo = req.originalUrl; // Store the URL they were trying to access
  res.redirect('/auth/login');
};

// Middleware to check if user is NOT authenticated
// Used for routes like login/register that should be inaccessible to logged-in users
exports.isNotAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    // User is not authenticated, proceed to the next middleware
    return next();
  }
  
  // User is already authenticated, redirect to profile page
  res.redirect('/user/profile');
};
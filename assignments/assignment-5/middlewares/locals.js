/**
 * Locals middleware
 * Sets variables that will be available in all views
 */

exports.setLocals = (req, res, next) => {
  // Make user information available to templates if user is logged in
  res.locals.user = req.session.user || null;
  
  // Flag to check if user is authenticated
  res.locals.isAuthenticated = !!req.session.user;
  
  // Add the current path for navigation highlighting
  res.locals.path = req.path;
  
  next();
};
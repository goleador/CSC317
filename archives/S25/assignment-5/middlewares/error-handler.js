/**
 * Error handling middleware
 * Provides centralized error handling for the application
 */

// Error handler middleware
exports.handleErrors = (err, req, res, next) => {
  console.error(err.stack);
  
  // Default error values
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong on the server';
  
  // Safely check authentication status
  const isAuthenticated = req.session && req.session.user ? true : false;
  
  // Helper functions for templates
  const helpers = {
    isActiveRoute: (path, route) => path === route,
    currentYear: () => new Date().getFullYear(),
    formatDate: (date) => {
      if (!date) return '';
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
  };

  // Handle CSRF token errors
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).render('error', {
      title: 'CSRF Error',
      message: 'Form submission has been rejected. Please try again.',
      error: { status: 403 },
      path: req.path || '/',
      isAuthenticated: isAuthenticated,
      helpers: helpers
    });
  }

  // Different response format based on requested content type
  if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
    // For API/AJAX requests, return JSON
    return res.status(statusCode).json({
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? err : {}
    });
  } else {
    // For regular requests, render an error page
    res.status(statusCode).render('error', {
      title: 'Error',
      message,
      error: process.env.NODE_ENV === 'development' ? err : {},
      path: req.path || '/',
      isAuthenticated: isAuthenticated,
      helpers: helpers
    });
  }
};
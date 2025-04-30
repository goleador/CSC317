# Web Security and Authentication with Express.js

## Introduction

Security is a critical aspect of web application development. This lecture covers the fundamentals of implementing authentication and security measures in Express.js applications, focusing on practical approaches and best practices.

## Prerequisites

- Basic knowledge of JavaScript
- Familiarity with Node.js and Express.js
- Understanding of HTTP protocol basics

## Setting Up a Secure Express Application

### Initial Setup

First, let's set up a basic Express application with security-focused dependencies:

```javascript
// Initialize a new Node.js project
// npm init -y

// Install essential packages
// npm install express bcrypt jsonwebtoken cookie-parser helmet express-rate-limit dotenv

// Basic server setup
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Security Headers with Helmet

[Helmet](https://helmetjs.github.io/) helps secure Express apps by setting various HTTP headers:

```javascript
// Apply Helmet middleware for security headers
app.use(helmet());

// Customize Helmet settings if needed
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-cdn.com"],
      },
    },
    // Disable specific middlewares if required
    // hidePoweredBy: false,
  })
);
```

### Rate Limiting

Protect your app from brute-force attacks with rate limiting:

```javascript
// Basic rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

// Apply rate limiter to all requests
app.use(limiter);

// Stricter rate limiter for authentication routes
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 attempts per hour
  message: 'Too many login attempts, please try again later'
});

// Apply to authentication routes
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
```

## User Authentication Implementation

### User Model

First, we need a user model. This example uses a simple in-memory array, but in production, you'd use a database:

```javascript
// Mock user database (use a real database in production)
const users = [];
```

### Password Hashing with bcrypt

Never store plain text passwords! Use bcrypt to hash passwords:

```javascript
const bcrypt = require('bcrypt');

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user object
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword
    };
    
    // Save user (to array in this example)
    users.push(newUser);
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
```

### Authentication with JSON Web Tokens (JWT)

JWTs provide a way to securely transmit information between parties:

```javascript
const jwt = require('jsonwebtoken');

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour in milliseconds
    });
    
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
```

### Authentication Middleware

Create middleware to protect routes that require authentication:

```javascript
// Auth middleware
const authMiddleware = (req, res, next) => {
  try {
    // Get token from cookie or authorization header
    const token = req.cookies.token || 
                  (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user data to request
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Protected route example
app.get('/api/user/profile', authMiddleware, (req, res) => {
  // Find user by ID from token
  const user = users.find(user => user.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Return user data without password
  const { password, ...userData } = user;
  res.json(userData);
});
```

### Logout Functionality

```javascript
// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  // Clear the cookie
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});
```

## Advanced Security Concepts

### Cross-Site Request Forgery (CSRF) Protection

CSRF attacks trick authenticated users into executing unwanted actions:

```javascript
const csrf = require('csurf');

// Configure CSRF protection
const csrfProtection = csrf({ 
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});

// Apply to routes that need protection
app.post('/api/user/update-profile', csrfProtection, authMiddleware, (req, res) => {
  // Update user profile logic
});

// Provide CSRF token for forms
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
```

### Cross-Site Scripting (XSS) Protection

Helmet helps with XSS protection, but also sanitize user inputs:

```javascript
const xss = require('xss-clean');

// Use XSS sanitizer
app.use(xss());

// Manual sanitization example
function sanitizeUserInput(input) {
  // Basic example - use a proper library in production
  return String(input)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
```

### SQL Injection Protection

If using SQL databases, use parameterized queries or an ORM:

```javascript
// Example with PostgreSQL client
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// BAD (vulnerable to SQL injection)
app.get('/users/search', async (req, res) => {
  const { name } = req.query;
  // DON'T DO THIS:
  const query = `SELECT * FROM users WHERE name = '${name}'`;
  
  // Rest of the code...
});

// GOOD (parameterized query)
app.get('/users/search', async (req, res) => {
  const { name } = req.query;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE name = $1',
      [name]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
```

### Environment Variable Security

Keep sensitive information in environment variables:

```javascript
// .env file (DO NOT COMMIT THIS FILE)
// JWT_SECRET=your-very-long-and-random-secret-key
// DATABASE_URL=postgres://username:password@localhost:5432/database

// Use environment variables in your code
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error('FATAL ERROR: JWT_SECRET is not defined');
  process.exit(1);
}
```

## Authentication Strategies and Options

### Session-Based Authentication vs. JWT

```javascript
// Session-based authentication example
const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Login with sessions
app.post('/api/auth/login-with-session', async (req, res) => {
  // Verify credentials as before
  
  // Instead of JWT, use session
  req.session.userId = user.id;
  
  res.status(200).json({ message: 'Login successful' });
});

// Auth middleware with sessions
const sessionAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  next();
};
```

### OAuth 2.0 Integration

For authenticating with third-party providers:

```javascript
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Initialize Passport
app.use(passport.initialize());

// Configure Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Find or create user based on Google profile
    // This is a simplified example
    const user = users.find(user => user.googleId === profile.id);
    
    if (user) {
      return done(null, user);
    }
    
    // Create new user
    const newUser = {
      id: users.length + 1,
      googleId: profile.id,
      username: profile.displayName,
      email: profile.emails[0].value
    };
    
    users.push(newUser);
    return done(null, newUser);
  }
));

// Google authentication routes
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/api/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Set token in cookie and redirect
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Allow cross-site cookie for OAuth flow
      maxAge: 3600000
    });
    
    res.redirect('/');
  });
```

### Two-Factor Authentication (2FA)

Enhance security with 2FA using libraries like `speakeasy`:

```javascript
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Generate 2FA secret for a user
app.post('/api/auth/enable-2fa', authMiddleware, (req, res) => {
  const secret = speakeasy.generateSecret({
    name: `YourApp:${req.user.email}`
  });
  
  // In a real app, save this to the user record in the database
  const user = users.find(user => user.id === req.user.id);
  user.twoFactorSecret = secret.base32;
  
  // Generate QR code for the user to scan with authenticator app
  QRCode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
    if (err) {
      return res.status(500).json({ message: 'Error generating QR code' });
    }
    
    res.json({
      message: '2FA enabled',
      qrCode: dataUrl
    });
  });
});

// Verify 2FA token
app.post('/api/auth/verify-2fa', authMiddleware, (req, res) => {
  const { token } = req.body;
  const user = users.find(user => user.id === req.user.id);
  
  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: 'base32',
    token
  });
  
  if (!verified) {
    return res.status(401).json({ message: 'Invalid 2FA token' });
  }
  
  res.json({ message: '2FA verified successfully' });
});
```

## Security Best Practices

### Password Policies

Implement strong password requirements:

```javascript
// Password validation middleware
const validatePassword = (req, res, next) => {
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }
  
  // Password requirements
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (
    password.length < minLength ||
    !hasUppercase ||
    !hasLowercase ||
    !hasNumbers ||
    !hasSpecialChar
  ) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters'
    });
  }
  
  next();
};

// Apply to registration route
app.post('/api/auth/register', validatePassword, async (req, res) => {
  // Registration logic here
});
```

### Security Logging and Monitoring

Log security events for monitoring:

```javascript
const winston = require('winston');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'security.log', level: 'info' })
  ]
});

// Log security events
app.post('/api/auth/login', async (req, res) => {
  try {
    // Login logic...
    
    if (isMatch) {
      logger.info({
        message: 'Successful login',
        userId: user.id,
        email: user.email,
        ip: req.ip
      });
      // Rest of login success code
    } else {
      logger.warn({
        message: 'Failed login attempt',
        email: req.body.email,
        ip: req.ip
      });
      // Rest of login failure code
    }
  } catch (error) {
    // Error handling
  }
});
```

### Regular Security Updates

Keep dependencies updated to patch security vulnerabilities:

```bash
# Check for vulnerable dependencies
npm audit

# Fix vulnerable dependencies automatically
npm audit fix

# For major version updates that might break compatibility
npm audit fix --force
```

## Putting It All Together: A Complete Authentication System

Here's a complete example combining all the security measures:

```javascript
// Full authentication system setup (conceptual example)
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const csrf = require('csurf');
const xss = require('xss-clean');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));  // Body limit as protection against large payloads
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(xss());
app.use(morgan('combined'));  // Logging

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

// CSRF protection
const csrfProtection = csrf({ cookie: true });

// Routes
const authRoutes = require('./routes/auth');  // Import your route modules
const userRoutes = require('./routes/user');

app.use('/api/auth', authRoutes);
app.use('/api/user', csrfProtection, userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ message: 'CSRF token validation failed' });
  }
  
  res.status(500).json({ 
    message: 'Something went wrong', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
```

## Security Testing and Auditing

To ensure your application is secure:

1. **Regular security audits**
   - Use tools like OWASP ZAP or Burp Suite
   - Perform penetration testing

2. **Automated vulnerability scanning**
   - `npm audit` for Node.js dependencies
   - SonarQube for code quality and security issues

3. **Code reviews focused on security**
   - Follow a security checklist
   - Involve team members with security expertise

## Conclusion

Building secure Express.js applications requires:

1. Implementing proper authentication mechanisms
2. Protecting against common web vulnerabilities
3. Following security best practices
4. Regular updates and security monitoring

Remember that security is not a one-time implementation but an ongoing process. Keep up with the latest security practices and vulnerabilities, and regularly update your application's security measures.

## Resources

- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Node.js Security Checklist](https://nodejs.org/en/docs/guides/security/)
- [JWT.io](https://jwt.io/) - Learn more about JSON Web Tokens

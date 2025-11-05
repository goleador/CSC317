# JavaScript Backend Development with Express - Part 2
## CSC317 - Week 2, Lecture 4 (75 minutes)

---

## Agenda
1. Advanced Express Middleware
2. Working with Template Engines
3. Database Integration
4. Error Handling and Debugging
5. Deployment Strategies

---

## 1. Advanced Express Middleware (15 minutes)

### Middleware Execution Flow

Middleware functions execute in the order they are defined:

```javascript
const express = require('express');
const app = express();

// Middleware 1 - Always executes
app.use((req, res, next) => {
  console.log('Middleware 1: Always executes');
  next();
});

// Middleware 2 - Path-specific
app.use('/api', (req, res, next) => {
  console.log('Middleware 2: Only for /api routes');
  next();
});

// Middleware 3 - Route-specific
app.get('/users', (req, res, next) => {
  console.log('Middleware 3: Only for GET /users');
  next();
}, (req, res) => {
  res.send('Users list');
});

// Error middleware must be defined last
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000);
```

### Custom Middleware Examples

**Request Logger:**
```javascript
// Custom logging middleware
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl || req.url;
  const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  console.log(`[${timestamp}] ${method} ${url} - ${ip}`);
  next();
};

app.use(logger);
```

**Authentication Middleware:**
```javascript
// Simple authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  const token = authHeader.split(' ')[1];
  
  // In a real app, verify the token securely
  if (token !== 'secret-token') {
    return res.status(403).json({ message: 'Invalid token' });
  }
  
  // Token is valid, attach user info to request
  req.user = { id: 123, role: 'admin' };
  next();
};

// Apply to all routes
// app.use(authenticate);

// Apply to specific routes
app.use('/admin', authenticate);
app.use('/api/protected', authenticate);
```

**Request Rate Limiting:**
```javascript
// Simple rate limiter
const rateLimit = () => {
  const requestCounts = {};
  const LIMIT = 10; // requests
  const WINDOW = 60 * 1000; // 1 minute in milliseconds
  
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    
    // Initialize or reset expired counter
    if (!requestCounts[ip] || now - requestCounts[ip].start > WINDOW) {
      requestCounts[ip] = {
        count: 1,
        start: now
      };
      return next();
    }
    
    // Increment counter for existing IP
    requestCounts[ip].count++;
    
    // Check if limit exceeded
    if (requestCounts[ip].count > LIMIT) {
      return res.status(429).json({ message: 'Too many requests, please try again later' });
    }
    
    next();
  };
};

app.use(rateLimit());
```

### Third-Party Middleware

**Popular Express Middleware Packages:**

1. **body-parser** (Now included in Express):
```javascript
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
```

2. **cors** - Cross-Origin Resource Sharing:
```javascript
const cors = require('cors');

// Enable all CORS requests
app.use(cors());

// Configure CORS options
app.use(cors({
  origin: 'https://example.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

3. **helmet** - Security headers:
```javascript
const helmet = require('helmet');

// Use all defaults
app.use(helmet());

// Configure specific protections
app.use(helmet({
  contentSecurityPolicy: false,
  xssFilter: true
}));
```

4. **morgan** - HTTP request logger:
```javascript
const morgan = require('morgan');

// Predefined formats: combined, common, dev, short, tiny
app.use(morgan('dev'));

// Custom format
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));
```

5. **compression** - Compress responses:
```javascript
const compression = require('compression');

app.use(compression());
```

6. **cookie-parser** - Parse Cookie header:
```javascript
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/set-cookie', (req, res) => {
  res.cookie('name', 'value', { maxAge: 900000, httpOnly: true });
  res.send('Cookie set');
});

app.get('/get-cookie', (req, res) => {
  res.send(req.cookies);
});
```

---

## 2. Working with Template Engines (15 minutes)

### Introduction to Template Engines

Template engines allow you to render dynamic HTML by combining static templates with data.

**Popular Template Engines:**
- EJS (Embedded JavaScript)
- Pug (formerly Jade)
- Handlebars
- Nunjucks

### Setting up EJS

**1. Install EJS:**
```bash
npm install ejs
```

**2. Configure Express to use EJS:**
```javascript
const express = require('express');
const path = require('path');
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Set views directory
app.set('views', path.join(__dirname, 'views'));
```

**3. Create EJS templates:**

```html
<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <h1><%= title %></h1>
  <p>Welcome to <%= title %></p>
  
  <h2>User List</h2>
  <ul>
    <% users.forEach(function(user) { %>
      <li><%= user.name %> - <%= user.email %></li>
    <% }); %>
  </ul>
</body>
</html>
```

**4. Render EJS templates:**
```javascript
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Express App',
    users: [
      { name: 'John', email: 'john@example.com' },
      { name: 'Jane', email: 'jane@example.com' },
      { name: 'Bob', email: 'bob@example.com' }
    ]
  });
});
```

### EJS Tags and Syntax

- `<%= variable %>` - Output escaped HTML
- `<%- variable %>` - Output unescaped HTML (use with caution)
- `<% code %>` - Execute JavaScript code
- `<%# comment %>` - EJS comment (not rendered)
- `<%- include('partial') %>` - Include another EJS file

### Using Partials (Reusable Components)

**Creating partials:**

```html
<!-- views/partials/header.ejs -->
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <header>
    <h1><%= title %></h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>
```

```html
<!-- views/partials/footer.ejs -->
  <footer>
    <p>&copy; <%= new Date().getFullYear() %> My Express App</p>
  </footer>
</body>
</html>
```

**Using partials in templates:**

```html
<!-- views/home.ejs -->
<%- include('partials/header') %>

<main>
  <h2>Welcome to our site</h2>
  <p>This is the home page content.</p>
</main>

<%- include('partials/footer') %>
```

### Layout Pattern with EJS

```javascript
// Create a middleware to set default template variables
app.use((req, res, next) => {
  // Set default variables for all views
  res.locals.siteTitle = 'My Express App';
  res.locals.currentYear = new Date().getFullYear();
  res.locals.currentPath = req.path;
  next();
});
```

```html
<!-- views/layout.ejs -->
<!DOCTYPE html>
<html>
<head>
  <title><%= siteTitle %> - <%= pageTitle %></title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <header>
    <h1><%= siteTitle %></h1>
    <nav>
      <a href="/" class="<%= currentPath === '/' ? 'active' : '' %>">Home</a>
      <a href="/about" class="<%= currentPath === '/about' ? 'active' : '' %>">About</a>
      <a href="/contact" class="<%= currentPath === '/contact' ? 'active' : '' %>">Contact</a>
    </nav>
  </header>

  <main>
    <%- body %>
  </main>

  <footer>
    <p>&copy; <%= currentYear %> <%= siteTitle %></p>
  </footer>
</body>
</html>
```

```html
<!-- views/about.ejs -->
<!-- This content will be injected into the layout's <%- body %> -->
<h2><%= pageTitle %></h2>
<p>This is the about page content.</p>
```

```javascript
// Using layout with express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('layout', 'layout'); // Default layout file

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Us'
  });
});
```

---

## 3. Database Integration (15 minutes)

### Database Options for Node.js Applications

**Popular Databases with Node.js:**
- **MongoDB** (NoSQL document database)
- **MySQL** (Relational database)
- **PostgreSQL** (Relational database)
- **SQLite** (File-based relational database)
- **Redis** (In-memory key-value store)

### Connecting to MongoDB with Mongoose

**1. Install Mongoose:**
```bash
npm install mongoose
```

**2. Connect to MongoDB:**
```javascript
const mongoose = require('mongoose');

// Connection URI
const MONGODB_URI = 'mongodb://localhost:27017/myapp';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));
```

**3. Define a Schema and Model:**
```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Add instance method
userSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

// Add static method
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email });
};

// Create model from schema
const User = mongoose.model('User', userSchema);

module.exports = User;
```

**4. CRUD Operations with Mongoose:**
```javascript
const User = require('./models/User');

// Create - save a new user
const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Read - find all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Read - find user by id
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Update - update user by id
const updateUser = async (userId, updateData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      updateData, 
      { new: true, runValidators: true }
    );
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete - delete user by id
const deleteUser = async (userId) => {
  try {
    const result = await User.findByIdAndDelete(userId);
    return result;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
```

### Integrating MongoDB with Express Routes

```javascript
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific user
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new user
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    
    // Don't send password back
    const userResponse = newUser.toObject();
    delete userResponse.password;
    
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) a user
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a user
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

### SQL Integration Example (MySQL with Sequelize)

**1. Install Sequelize and MySQL driver:**
```bash
npm install sequelize mysql2
```

**2. Set up connection:**
```javascript
const { Sequelize } = require('sequelize');

// Option 1: Passing connection parameters directly
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();
```

**3. Define a model:**
```javascript
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  // Model attributes
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  // Model options
  timestamps: true,
  tableName: 'users'
});

// Sync model with database (create table if it doesn't exist)
User.sync();
```

**4. CRUD operations with Sequelize:**
```javascript
// Create a new user
const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Find all users
const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Find user by id
const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Update user
const updateUser = async (userId, updateData) => {
  try {
    const [updated] = await User.update(updateData, {
      where: { id: userId }
    });
    
    if (updated) {
      const updatedUser = await User.findByPk(userId);
      return updatedUser;
    }
    
    throw new Error('User not found');
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete user
const deleteUser = async (userId) => {
  try {
    const deleted = await User.destroy({
      where: { id: userId }
    });
    
    if (deleted) {
      return true;
    }
    
    throw new Error('User not found');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
```

---

## 4. Error Handling and Debugging (15 minutes)

### Express Error Handling

**Basic Error Handling Middleware:**
```javascript
// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

**Custom Error Class:**
```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
```

**Route with Error Handling:**
```javascript
const AppError = require('./utils/appError');

app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    
    res.json(user);
  } catch (error) {
    next(new AppError('Error fetching user', 500));
  }
});
```

**Comprehensive Error Handler:**
```javascript
// Global error handler
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Development error response (detailed)
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }
  
  // Production error response (limited info)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
  
  // Programming or unknown errors: don't leak details
  console.error('ERROR:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong'
  });
};

app.use(errorHandler);
```

### Async Error Handling

**Problems with Async Routes:**
```javascript
// Without proper error handling
app.get('/users', async (req, res) => {
  // If this throws, Express won't catch it
  const users = await User.find();
  res.json(users);
});
```

**Solutions:**

1. **Try/Catch in Every Route:**
```javascript
app.get('/users', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});
```

2. **Wrapper Function:**
```javascript
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

app.get('/users', catchAsync(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));
```

3. **Express Async Errors Package:**
```javascript
// At the top of your application
require('express-async-errors');

// Now async errors are automatically caught
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});
```

### Debugging Express Applications

**1. Console Logging:**
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  console.log('Request Headers:', req.headers);
  next();
});
```

**2. Using Node.js Debugger:**
```bash
# Run with inspect flag
node --inspect app.js

# Or with breakpoints
node --inspect-brk app.js
```
Then open Chrome and navigate to `chrome://inspect`

**3. Using Debug Package:**
```javascript
const debug = require('debug')('app:server');

app.get('/', (req, res) => {
  debug('Homepage was accessed');
  res.send('Home Page');
});
```
Run with `DEBUG=app:* node app.js`

**4. Request Tracing with Correlation IDs:**
```javascript
const { v4: uuidv4 } = require('uuid');

app.use((req, res, next) => {
  req.requestId = uuidv4();
  res.setHeader('X-Request-ID', req.requestId);
  
  console.log(`[${req.requestId}] ${req.method} ${req.url}`);
  next();
});
```

---

## 5. Deployment Strategies (15 minutes)

### Preparing for Production

**Environment Variables:**
```javascript
// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';

console.log(`Environment: ${NODE_ENV}`);
```

**Environment-Specific Configuration:**
```javascript
// config.js
const config = {
  development: {
    port: 3000,
    db: 'mongodb://localhost:27017/myapp',
    logLevel: 'debug'
  },
  test: {
    port: 3001,
    db: 'mongodb://localhost:27017/myapp_test',
    logLevel: 'info'
  },
  production: {
    port: process.env.PORT,
    db: process.env.MONGODB_URI,
    logLevel: 'error'
  }
};

const env = process.env.NODE_ENV || 'development';
module.exports = config[env];
```

**Security Best Practices:**
```javascript
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();

// Security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
  origin: 'https://yourdomain.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Disable revealing technologies
app.disable('x-powered-by');

// Only use cookies with httpOnly and secure flags in production
if (process.env.NODE_ENV === 'production') {
  app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      secure: true
    }
  }));
}
```

### Deployment Platforms

**1. Heroku:**
- Create Procfile: `web: node index.js`
- Set up environment variables in Heroku dashboard
- Deploy via Git: `git push heroku main`

**2. Digital Ocean/AWS/Google Cloud:**
- Set up a virtual machine
- Install Node.js
- Use PM2 for process management
- Set up NGINX as reverse proxy

**3. Serverless (AWS Lambda, Netlify Functions):**
```javascript
// Example AWS Lambda function with Serverless framework
module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Lambda!'
    })
  };
};
```

### Process Management with PM2

**Installation:**
```bash
npm install pm2 -g
```

**Basic Commands:**
```bash
# Start application
pm2 start app.js

# Start with name and instances
pm2 start app.js --name "my-app" -i 4

# List all running processes
pm2 list

# Monitor processes
pm2 monit

# Restart application
pm2 restart my-app

# Stop application
pm2 stop my-app

# Delete from PM2
pm2 delete my-app
```

**PM2 Configuration File (ecosystem.config.js):**
```javascript
module.exports = {
  apps: [{
    name: 'my-express-app',
    script: 'server.js',
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 8080
    }
  }]
};
```

Run with: `pm2 start ecosystem.config.js --env production`

### Load Balancing and Scaling

**Using Node.js Cluster Module:**
```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const express = require('express');

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Replace dead worker
    cluster.fork();
  });
} else {
  // Workers share the TCP connection
  const app = express();
  
  app.get('/', (req, res) => {
    res.send(`Response from worker ${process.pid}`);
  });
  
  app.listen(3000, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
```

**NGINX Configuration for Load Balancing:**
```nginx
upstream node_app {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}

server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://node_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Hands-on Workshop: Building a Complete Express Application (Remaining time)

### Task: Create a RESTful API with Database Integration

**1. Project Setup:**
```bash
mkdir complete-express-api
cd complete-express-api
npm init -y
# Update package.json to set "main": "server.js"
npm install express mongoose dotenv helmet cors express-async-errors
npm install --save-dev nodemon
```

**2. Project Structure:**
```
/complete-express-api
  /config
    - db.js
  /controllers
    - userController.js
  /middleware
    - auth.js
    - error.js
  /models
    - User.js
  /routes
    - users.js
  - .env
  - app.js      # Express application setup
  - server.js   # Entry point to start the server
```

**3. Example Implementation:**

**.env file:**
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/express-api
NODE_ENV=development
```

**config/db.js:**
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

**models/User.js:**
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ],
    lowercase: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
```

**controllers/userController.js:**
```javascript
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ success: true, data: users });
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Public
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  res.status(200).json({ success: true, data: user });
};

// @desc    Create new user
// @route   POST /api/users
// @access  Public
exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Public
exports.updateUser = async (req, res) => {
  let user = await User.findById(req.params.id);
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({ success: true, data: user });
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Public
exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  await user.remove();
  
  res.status(200).json({ success: true, data: {} });
};
```

**routes/users.js:**
```javascript
const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
```

**middleware/error.js:**
```javascript
const errorHandler = (err, req, res, next) => {
  console.error(err);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ success: false, error: message });
  }
  
  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(400).json({ success: false, error: 'Duplicate field value entered' });
  }
  
  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
};

module.exports = errorHandler;
```

**app.js:**
```javascript
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
require('express-async-errors');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config();

// Route files
const userRoutes = require('./routes/users');

const app = express();

// Body parser
app.use(express.json());

// Set security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/users', userRoutes);

// Error handler middleware
app.use(errorHandler);

module.exports = app;
```

**server.js:**
```javascript
const app = require('./app');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});"

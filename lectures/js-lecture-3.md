# JavaScript Backend Development with Express - Part 1
## CSC317 - Week 2, Lecture 3 (75 minutes)

---

## Agenda
1. Introduction to Backend Development
2. Node.js for Server-Side JavaScript
3. Express.js Framework Basics
4. Building Your First Express Server
5. Routing in Express

---

## 1. Introduction to Backend Development (15 minutes)

### Frontend vs Backend

| Frontend | Backend |
|----------|---------|
| Runs in browser | Runs on server |
| HTML, CSS, JavaScript | Various languages (JavaScript, Python, Java, etc.) |
| User interface | Data processing, business logic |
| Directly interacts with users | Interacts with databases, external services |
| Public code (visible in browser) | Private code (secure on server) |

### Server-Side Operations

**Common backend responsibilities:**
- Processing and validating form submissions
- User authentication and authorization
- Database operations (CRUD - Create, Read, Update, Delete)
- File operations
- API integrations
- Business logic implementation
- Securing sensitive data

### Client-Server Architecture

```
Browser (Client)                   Server
┌─────────────────┐  HTTP Request  ┌─────────────────┐
│                 │ ─────────────► │                 │
│                 │                │                 │
│                 │ ◄───────────── │                 │
└─────────────────┘  HTTP Response └─────────────────┘
```

**HTTP Request Components:**
- Method (GET, POST, PUT, DELETE)
- URL path
- Headers
- Body (optional)

**HTTP Response Components:**
- Status code (200 OK, 404 Not Found, 500 Server Error)
- Headers
- Body (HTML, JSON, etc.)

### Why JavaScript for Backend?

- **Language Consistency**: Same language across stack (frontend & backend)
- **JSON Support**: Native handling of JSON data
- **Asynchronous by design**: Non-blocking I/O operations
- **Vast ecosystem**: Large number of libraries (npm)
- **Community support**: Active development and resources
- **Performance**: V8 engine provides good performance
- **Scalability**: Event-driven architecture handles many connections

---

## 2. Node.js for Server-Side JavaScript (15 minutes)

### Node.js Overview

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows executing JavaScript code outside a web browser.

**Key Features:**
- Single-threaded with event loop architecture
- Non-blocking I/O operations
- CommonJS module system (require/exports)
- npm (Node Package Manager)

### Node.js Core Modules

```javascript
// File System operations with promises (modern approach)
const fs = require('fs').promises;
// Or: const { promises: fs } = require('fs');

// Reading a file with async/await
const readFileExample = async () => {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    console.log('File contents:', data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
};

// Writing to a file with async/await
const writeFileExample = async () => {
  try {
    await fs.writeFile('output.txt', 'Hello, Node.js!');
    console.log('File written successfully');
  } catch (error) {
    console.error('Error writing file:', error);
  }
};

// Multiple file operations in sequence
const processFiles = async () => {
  try {
    // Read file
    const data = await fs.readFile('input.txt', 'utf8');

    // Transform data
    const transformed = data.toUpperCase();

    // Write to new file
    await fs.writeFile('output.txt', transformed);

    console.log('Files processed successfully');
  } catch (error) {
    console.error('Error processing files:', error);
  }
};

// Multiple file operations in parallel
const readMultipleFiles = async () => {
  try {
    const [file1, file2, file3] = await Promise.all([
      fs.readFile('file1.txt', 'utf8'),
      fs.readFile('file2.txt', 'utf8'),
      fs.readFile('file3.txt', 'utf8')
    ]);

    console.log('All files read:', { file1, file2, file3 });
  } catch (error) {
    console.error('Error reading files:', error);
  }
};

// Call the async functions
readFileExample();
writeFileExample();
```

**Note:** For older Node.js versions or callback-based fs operations, see the legacy pattern below:
```javascript
// Legacy callback pattern (old style - avoid in new code)
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File contents:', data);
});
```

```javascript
// HTTP server without Express
const http = require('http');

const server = http.createServer((req, res) => {
  // Set response headers
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // Check URL path
  if (req.url === '/') {
    res.end('Hello, World!');
  } else if (req.url === '/about') {
    res.end('About page');
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(3000, 'localhost', () => {
  console.log('Server running at http://localhost:3000/');
});
```

### Node.js Module System

**Creating and Exporting a Module:**
```javascript
// utils.js
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function calculateSum(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

// CommonJS exports
module.exports = {
  formatDate,
  calculateSum
};

// Alternative syntax
// exports.formatDate = formatDate;
// exports.calculateSum = calculateSum;
```

**Importing and Using a Module:**
```javascript
// app.js
const utils = require('./utils');

console.log(utils.formatDate(new Date())); // 2024-04-12
console.log(utils.calculateSum([1, 2, 3, 4, 5])); // 15

// Destructuring import
const { formatDate, calculateSum } = require('./utils');
console.log(formatDate(new Date()));
```

### ES Modules (Modern Alternative)

**Note:** ES Modules are the modern JavaScript module standard. To use them in Node.js, add `"type": "module"` to your `package.json` or use `.mjs` file extension.

**package.json configuration:**
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module"
}
```

**Creating and Exporting a Module:**
```javascript
// utils.mjs (or utils.js with "type": "module" in package.json)

// Named exports
export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

export const calculateSum = (numbers) => {
  return numbers.reduce((sum, num) => sum + num, 0);
};

// Export multiple at once
export { formatDate, calculateSum };

// Default export
const utils = {
  formatDate,
  calculateSum
};

export default utils;
```

**Importing and Using ES Modules:**
```javascript
// app.mjs (or app.js with "type": "module")

// Named imports
import { formatDate, calculateSum } from './utils.js';

console.log(formatDate(new Date())); // 2024-04-12
console.log(calculateSum([1, 2, 3, 4, 5])); // 15

// Import all as namespace
import * as utils from './utils.js';
console.log(utils.formatDate(new Date()));

// Default import
import utils from './utils.js';
console.log(utils.formatDate(new Date()));

// Mixed imports
import defaultExport, { formatDate, calculateSum } from './utils.js';

// Dynamic imports (works with both module types)
const loadModule = async () => {
  const module = await import('./utils.js');
  console.log(module.formatDate(new Date()));
};
```

**Top-Level Await (ES Modules Only):**
```javascript
// Only works in ES Modules
const data = await fetch('https://api.example.com/data');
const json = await data.json();
console.log(json);

// With file operations
import { promises as fs } from 'fs';
const fileContent = await fs.readFile('data.txt', 'utf8');
console.log(fileContent);
```

**CommonJS vs ES Modules Comparison:**

| Feature | CommonJS | ES Modules |
|---------|----------|------------|
| Syntax | `require()` / `module.exports` | `import` / `export` |
| Loading | Synchronous | Asynchronous |
| File Extensions | `.js` (default) | `.mjs` or `.js` with `"type": "module"` |
| Top-Level Await | ❌ Not supported | ✅ Supported |
| Dynamic Imports | Limited | ✅ `import()` |
| Tree Shaking | ❌ Not supported | ✅ Supported |
| Browser Support | ❌ No | ✅ Native support |
| Node.js Support | ✅ Default | ✅ Requires configuration |

**When to use which:**
- **CommonJS**: Legacy projects, packages that need to support older Node.js versions, simpler for beginners
- **ES Modules**: New projects, when you need top-level await, better for code splitting and tree shaking, future standard

**Express with ES Modules:**
```javascript
// app.mjs
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express with ES Modules!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

### npm (Node Package Manager)

**Key npm Commands:**

```bash
# Initialize a new Node.js project
npm init

# Install a package
npm install express

# Install a development dependency
npm install --save-dev nodemon

# Install packages from package.json
npm install

# Run a script defined in package.json
npm run start
```

**package.json Example:**
```json
{
  "name": "example-app",
  "version": "1.0.0",
  "description": "Example Node.js application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

---

## 3. Express.js Framework Basics (15 minutes)

### What is Express.js?

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

**Key Features:**
- Routing system
- Middleware architecture
- Template engine support
- Easy integration with databases
- Error handling
- Static file serving

### Setting Up an Express Project

**1. Create a new directory and initialize npm:**
```bash
mkdir express-app
cd express-app
npm init -y
```

**2. Install Express:**
```bash
npm install express
```

**3. Create an index.js file:**
```javascript
const express = require('express');

// Create Express application
const app = express();
const port = 3000;

// Define a route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

**4. Run the application:**
```bash
node index.js
```

### Express vs Vanilla Node.js

**Creating a basic server:**

**With Node.js HTTP:**
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  
  res.setHeader('Content-Type', 'text/html');
  
  if (url === '/') {
    res.statusCode = 200;
    res.end('<h1>Home Page</h1>');
  } else if (url === '/about') {
    res.statusCode = 200;
    res.end('<h1>About Page</h1>');
  } else {
    res.statusCode = 404;
    res.end('<h1>404 Not Found</h1>');
  }
});

server.listen(3000);
```

**With Express:**
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('<h1>Home Page</h1>');
});

app.get('/about', (req, res) => {
  res.status(200).send('<h1>About Page</h1>');
});

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(3000);
```

### Express Middleware Concept

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.

```javascript
const express = require('express');
const app = express();

// Example middleware function
const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next(); // Call next middleware
};

// Apply middleware to all routes
app.use(logger);

// Route handler
app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(3000);
```

**Common Built-in Middleware:**
```javascript
// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies (form data)
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static('public'));
```

---

## 4. Building Your First Express Server (15 minutes)

### Setting up a Complete Express Application

**Project Structure:**
```
express-app/
  ├── node_modules/
  ├── public/
  │   ├── css/
  │   │   └── styles.css
  │   └── js/
  │       └── script.js
  ├── views/
  │   ├── index.html
  │   └── about.html
  ├── index.js
  └── package.json
```

**Server Implementation:**
```javascript
// index.js
const express = require('express');
const path = require('path');

// Initialize express app
const app = express();
const port = 3000;

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route for about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// API route example
app.get('/api/data', (req, res) => {
  const data = {
    message: 'API response',
    timestamp: new Date().toISOString()
  };
  res.json(data);
});

// POST request example
app.post('/api/submit', (req, res) => {
  console.log('Received data:', req.body);
  res.status(201).json({
    message: 'Data received successfully',
    data: req.body
  });
});

// 404 handler - must be last route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

### Understanding Express Request & Response Objects

**Request (req) Object Properties:**
- `req.method` - HTTP method (GET, POST, etc.)
- `req.path` - Path part of URL
- `req.query` - Query parameters object
- `req.params` - Route parameters object
- `req.body` - Request body (requires middleware)
- `req.headers` - HTTP headers object
- `req.cookies` - Cookies (requires cookie-parser)

**Response (res) Object Methods:**
- `res.send()` - Send a response
- `res.json()` - Send a JSON response
- `res.sendFile()` - Send a file
- `res.render()` - Render a view template
- `res.status()` - Set HTTP status code
- `res.redirect()` - Redirect to another URL
- `res.download()` - Send a file as attachment

**Example:**
```javascript
app.get('/users/:id', (req, res) => {
  console.log('Route Parameters:', req.params); // { id: '123' }
  console.log('Query Parameters:', req.query);  // { sort: 'name' }
  console.log('Request Headers:', req.headers);
  
  res.status(200).json({
    userId: req.params.id,
    sortBy: req.query.sort
  });
});
```

### Serving Static Files

```javascript
// Serve files from 'public' directory
app.use(express.static('public'));

// With a URL prefix
app.use('/static', express.static('public'));

// With absolute path (recommended)
app.use(express.static(path.join(__dirname, 'public')));
```

**File Structure:**
```
public/
  ├── css/
  │   └── styles.css
  ├── js/
  │   └── script.js
  └── images/
      └── logo.png
```

**Accessing Files:**
```
http://localhost:3000/css/styles.css
http://localhost:3000/js/script.js
http://localhost:3000/images/logo.png
```

---

## 5. Routing in Express (15 minutes)

### Basic Routing

```javascript
// HTTP methods
app.get('/hello', (req, res) => {
  res.send('GET request to /hello');
});

app.post('/hello', (req, res) => {
  res.send('POST request to /hello');
});

app.put('/hello', (req, res) => {
  res.send('PUT request to /hello');
});

app.delete('/hello', (req, res) => {
  res.send('DELETE request to /hello');
});

// Method chaining
app.route('/user')
  .get((req, res) => {
    res.send('Get user');
  })
  .post((req, res) => {
    res.send('Add user');
  })
  .put((req, res) => {
    res.send('Update user');
  })
  .delete((req, res) => {
    res.send('Delete user');
  });
```

### Route Parameters

```javascript
// Single parameter
app.get('/users/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

// Multiple parameters
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(`User ID: ${req.params.userId}, Book ID: ${req.params.bookId}`);
});

// Optional parameters (using ?)
app.get('/users/:userId/profile/:section?', (req, res) => {
  const section = req.params.section || 'general';
  res.send(`User ID: ${req.params.userId}, Section: ${section}`);
});
```

### Query Parameters

```javascript
// Example URL: /search?q=express&limit=10
app.get('/search', (req, res) => {
  const query = req.query.q || '';
  const limit = parseInt(req.query.limit) || 10;
  
  res.json({
    search: query,
    limit: limit
  });
});
```

### Router-level Middleware

```javascript
const express = require('express');
const app = express();

// Create a router instance
const adminRouter = express.Router();

// Middleware specific to admin routes
adminRouter.use((req, res, next) => {
  console.log('Admin route accessed at:', new Date().toISOString());
  
  // Check if user is admin
  if (!req.query.admin) {
    return res.status(403).send('Access denied');
  }
  
  next();
});

// Admin routes
adminRouter.get('/dashboard', (req, res) => {
  res.send('Admin Dashboard');
});

adminRouter.get('/users', (req, res) => {
  res.send('Admin Users List');
});

// Mount the router
app.use('/admin', adminRouter);

app.listen(3000);
```

### Modular Route Handling

**Creating route modules:**

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Users list');
});

router.get('/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

router.post('/', (req, res) => {
  res.send('Create user');
});

module.exports = router;
```

```javascript
// routes/products.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Products list');
});

router.get('/:id', (req, res) => {
  res.send(`Product ID: ${req.params.id}`);
});

module.exports = router;
```

**Using route modules in the main app:**

```javascript
// app.js
const express = require('express');
const app = express();

// Import route modules
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');

// Mount the routes
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

app.listen(3000);
```

---

## Hands-on Workshop: Building a Basic API Server (Remaining time)

### Task: Create a simple REST API for a "tasks" collection

**1. Set up the project:**
```bash
mkdir task-api
cd task-api
npm init -y
npm install express
```

**2. Create the server file (app.js):**
```javascript
const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// In-memory "database"
let tasks = [
  { id: 1, title: 'Learn Express', completed: false },
  { id: 2, title: 'Build an API', completed: false }
];

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// GET a single task
app.get('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(task => task.id === id);
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  res.json(task);
});

// POST a new task
app.post('/api/tasks', (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title: req.body.title,
    completed: req.body.completed || false
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT (update) a task
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  const updatedTask = {
    id: id,
    title: req.body.title || tasks[taskIndex].title,
    completed: req.body.completed !== undefined ? req.body.completed : tasks[taskIndex].completed
  };
  
  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

**3. Testing the API with curl or Postman:**

```bash
# Get all tasks
curl http://localhost:3000/api/tasks

# Get a single task
curl http://localhost:3000/api/tasks/1

# Create a new task
curl -X POST -H "Content-Type: application/json" -d '{"title": "New Task"}' http://localhost:3000/api/tasks

# Update a task
curl -X PUT -H "Content-Type: application/json" -d '{"completed": true}' http://localhost:3000/api/tasks/1

# Delete a task
curl -X DELETE http://localhost:3000/api/tasks/2
```

---

## Summary
In this lecture, we covered:
1. Introduction to backend development and server-side JavaScript
2. Node.js fundamentals and its module system
3. Express.js framework basics and advantages over vanilla Node.js
4. Building a simple Express server with middleware and routing
5. Creating RESTful APIs with Express

## Next Lecture
In our next lecture, we'll explore:
- More advanced Express features
- Middleware patterns
- Template engines for server-side rendering
- Working with databases
- Error handling and debugging
- Deployment strategies

---

## Additional Resources
- [Express.js Official Documentation](https://expressjs.com/)
- [MDN: Express/Node Introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)
- [Node.js Official Documentation](https://nodejs.org/en/docs/)
- [REST API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)

# SQL/PostgreSQL with Express.js

## Table of Contents
1. [Introduction](#introduction)
2. [Setting Up the Environment](#setting-up-the-environment)
3. [Connecting Express to PostgreSQL](#connecting-express-to-postgresql)
4. [Basic Database Operations](#basic-database-operations)
5. [Creating a RESTful API](#creating-a-restful-api)
6. [Advanced Techniques](#advanced-techniques)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

## Introduction

PostgreSQL (often called "Postgres") is a powerful, open-source object-relational database system with a strong reputation for reliability, feature robustness, and performance. When combined with Express.js, a minimal and flexible Node.js web application framework, you can build robust backend systems that efficiently manage and serve data.

This guide will walk you through integrating PostgreSQL with an Express application, from initial setup to advanced operations.

## Setting Up the Environment

### Installing PostgreSQL

First, you'll need to install PostgreSQL on your system:

**For macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**For Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**For Windows:**
Download and run the installer from the [official PostgreSQL website](https://www.postgresql.org/download/windows/).

### Creating a Database

After installation, create a database for your project:

```bash
# Login to PostgreSQL
sudo -u postgres psql

# Create a database
CREATE DATABASE myexpressapp;

# Create a user
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE myexpressapp TO myuser;

# Exit PostgreSQL
\q
```

### Setting Up Express.js Project

Initialize a new Node.js project and install the required packages:

```bash
mkdir express-postgres-app
cd express-postgres-app
npm init -y
npm install express pg dotenv
```

## Connecting Express to PostgreSQL

### Setting Up Environment Variables

Create a `.env` file in your project root to store database credentials:

```
DB_USER=myuser
DB_PASSWORD=mypassword
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=myexpressapp
```

### Creating the Database Connection

Create a file named `db.js` to handle the database connection:

```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
```

### Testing the Connection

Create a simple test script to verify the connection:

```javascript
const db = require('./db');

async function testConnection() {
  try {
    const res = await db.query('SELECT NOW()');
    console.log('Connection successful:', res.rows[0]);
  } catch (err) {
    console.error('Connection error:', err);
  }
}

testConnection();
```

## Basic Database Operations

### Creating Tables

Let's create a table for users:

```javascript
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

async function createTable() {
  try {
    await db.query(createTableQuery);
    console.log('Table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  }
}

createTable();
```

### Basic CRUD Operations

#### Create (INSERT)

```javascript
async function createUser(name, email) {
  const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
  const values = [name, email];
  
  try {
    const res = await db.query(query, values);
    console.log('User created:', res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
}
```

#### Read (SELECT)

```javascript
async function getAllUsers() {
  try {
    const res = await db.query('SELECT * FROM users ORDER BY created_at DESC');
    console.log('All users:', res.rows);
    return res.rows;
  } catch (err) {
    console.error('Error getting users:', err);
    throw err;
  }
}

async function getUserById(id) {
  try {
    const res = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (res.rows.length === 0) {
      return null;
    }
    
    console.log('User found:', res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error('Error getting user:', err);
    throw err;
  }
}
```

#### Update (UPDATE)

```javascript
async function updateUser(id, name, email) {
  const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *';
  const values = [name, email, id];
  
  try {
    const res = await db.query(query, values);
    
    if (res.rows.length === 0) {
      return null;
    }
    
    console.log('User updated:', res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
}
```

#### Delete (DELETE)

```javascript
async function deleteUser(id) {
  try {
    const res = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    
    if (res.rows.length === 0) {
      return null;
    }
    
    console.log('User deleted:', res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  }
}
```

## Creating a RESTful API

Now, let's create an Express application that exposes these database operations as a RESTful API:

### Setting Up Express Application

Create a file named `app.js`:

```javascript
const express = require('express');
const app = express();
const db = require('./db');

// Middleware to parse JSON bodies
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Root route
app.get('/', (req, res) => {
  res.send('Express PostgreSQL API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
```

### Implementing API Routes

Add the following routes to your `app.js`:

```javascript
// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  
  try {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  
  // Validate input
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  try {
    const result = await db.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    
    if (err.code === '23505') { // Unique violation
      return res.status(409).json({ error: 'Email already exists' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  
  // Validate input
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  try {
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    
    if (err.code === '23505') { // Unique violation
      return res.status(409).json({ error: 'Email already exists' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  
  try {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

## Advanced Techniques

### Using Transactions

Transactions ensure that a series of database operations either all succeed or all fail:

```javascript
async function transferFunds(fromAccountId, toAccountId, amount) {
  const client = await pool.connect();
  
  try {
    // Begin transaction
    await client.query('BEGIN');
    
    // Deduct from source account
    await client.query(
      'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
      [amount, fromAccountId]
    );
    
    // Add to destination account
    await client.query(
      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
      [amount, toAccountId]
    );
    
    // Commit transaction
    await client.query('COMMIT');
    
    return true;
  } catch (err) {
    // Rollback in case of error
    await client.query('ROLLBACK');
    console.error('Transaction error:', err);
    throw err;
  } finally {
    // Release client back to pool
    client.release();
  }
}
```

### Parameterized Queries

Always use parameterized queries to prevent SQL injection:

```javascript
// BAD - vulnerable to SQL injection
app.get('/api/users', async (req, res) => {
  const name = req.query.name;
  // DON'T DO THIS:
  const query = `SELECT * FROM users WHERE name = '${name}'`;
  // ...
});

// GOOD - uses parameterized query
app.get('/api/users', async (req, res) => {
  const name = req.query.name;
  // DO THIS INSTEAD:
  const query = 'SELECT * FROM users WHERE name = $1';
  const values = [name];
  const result = await db.query(query, values);
  // ...
});
```

### Pagination

Implement pagination to handle large datasets:

```javascript
app.get('/api/users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  
  try {
    // Get paginated users
    const usersResult = await db.query(
      'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    
    // Get total count
    const countResult = await db.query('SELECT COUNT(*) FROM users');
    const totalUsers = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalUsers / limit);
    
    res.status(200).json({
      users: usersResult.rows,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalUsers,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Using an ORM (Sequelize)

For more complex applications, consider using an ORM like Sequelize:

```bash
npm install sequelize pg pg-hstore
```

Basic setup with Sequelize:

```javascript
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Set to console.log to see SQL queries
  }
);

// Define User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
}, {
  // Model options
  timestamps: true, // Adds createdAt and updatedAt
  underscored: true, // Uses snake_case column names
});

// Sync model with database
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database & tables synced');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
})();

module.exports = { sequelize, User };
```

Using the model in routes:

```javascript
const { User } = require('./models');

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create user
app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});
```

## Best Practices

### Database Connection Management

1. **Use a Connection Pool**: The `pg` module's `Pool` class manages multiple connections efficiently.

2. **Handle Connection Errors**: Set up event listeners for connection issues:

```javascript
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});
```

3. **Release Connections**: Always release connections back to the pool after use.

### Security Considerations

1. **Never Store Passwords in Plain Text**: Use bcrypt or similar for password hashing:

```javascript
const bcrypt = require('bcrypt');

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Verify password
const isMatch = await bcrypt.compare(password, hashedPassword);
```

2. **Validate User Input**: Use a validation library like Joi or express-validator:

```bash
npm install express-validator
```

```javascript
const { body, validationResult } = require('express-validator');

app.post('/api/users', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  // Continue with request...
});
```

3. **Set Up SSL for Database Connection**:

```javascript
const pool = new Pool({
  // Other connection options...
  ssl: {
    rejectUnauthorized: false, // Set to true in production with proper certificates
  },
});
```

### Performance Optimization

1. **Index Frequently Queried Columns**:

```sql
CREATE INDEX idx_users_email ON users(email);
```

2. **Use Prepared Statements**: The `pg` module's parameterized queries use prepared statements under the hood.

3. **Limit Result Sets**: Always paginate large result sets.

4. **Use Database Migrations**: Tools like `node-pg-migrate` help manage schema changes:

```bash
npm install node-pg-migrate pg
```

## Troubleshooting

### Common Issues and Solutions

1. **Connection Refused**:
   - Check if PostgreSQL service is running
   - Verify connection details in `.env` file
   - Ensure firewall allows connections on the PostgreSQL port

2. **Authentication Failed**:
   - Check username and password
   - Verify the user has proper privileges

3. **Slow Queries**:
   - Use `EXPLAIN ANALYZE` to diagnose:
     ```sql
     EXPLAIN ANALYZE SELECT * FROM users WHERE email LIKE '%example.com';
     ```
   - Add appropriate indexes
   - Rewrite inefficient queries

4. **Connection Leaks**:
   - Always release clients back to the pool
   - Use `finally` blocks to ensure release even on errors

### Debugging Tools

1. **Enable PostgreSQL logs**:

```sql
ALTER SYSTEM SET log_statement = 'all';
SELECT pg_reload_conf();
```

2. **Use Morgan for HTTP request logging**:

```bash
npm install morgan
```

```javascript
const morgan = require('morgan');
app.use(morgan('dev')); // Log requests to console
```

3. **Monitor queries with pg-monitor**:

```bash
npm install pg-monitor
```

```javascript
const monitor = require('pg-monitor');
monitor.attach({ ...options });
```

---

This guide covered the essentials of integrating PostgreSQL with Express.js applications. From basic setup to advanced techniques, you now have the knowledge to build robust, database-driven web applications. Remember to follow best practices for security, performance, and code organization as your application grows.

Happy coding!

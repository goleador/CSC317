# Static Variables and Functions: Understanding Singletons in JavaScript
## CSC 317 - Web Application Development
*Estimated Duration: 15 minutes*

---

## Learning Objectives
By the end of this lecture, you will:
- Understand what static variables and functions are and why they matter
- Recognize the Singleton pattern and its use cases in web development
- Implement practical examples of static methods and singleton patterns
- Understand the memory implications and performance considerations

---

## Part 1: Static Variables and Functions (5 minutes)

### What are Static Variables and Functions?

**Static** members belong to the class itself, not to any specific instance of the class. Think of them as "shared" across all instances.

```javascript
class Counter {
    // Static variable - shared across ALL instances
    static totalCount = 0;
    
    constructor(name) {
        this.name = name;
        this.individualCount = 0;
        // Every time we create a new Counter, increment the shared total
        Counter.totalCount++;
    }
    
    // Instance method - works on individual counter
    increment() {
        this.individualCount++;
        Counter.totalCount++;
    }
    
    // Static method - works on the class level
    static getTotalCount() {
        return Counter.totalCount;
    }
    
    // Static method - resets the shared counter
    static resetGlobalCounter() {
        Counter.totalCount = 0;
    }
}

// Let's see this in action
const counterA = new Counter("A");
const counterB = new Counter("B");

console.log(Counter.getTotalCount()); // 2 (two instances created)

counterA.increment();
counterB.increment();

console.log(Counter.getTotalCount()); // 4 (2 creations + 2 increments)
console.log(counterA.individualCount); // 1
console.log(counterB.individualCount); // 1
```

### Key Characteristics:
- **Memory Efficient**: Static variables exist once, regardless of how many instances you create
- **Shared State**: All instances share the same static variables
- **Class-Level Access**: You call static methods on the class itself, not on instances

---

## Part 2: The Singleton Pattern (7 minutes)

### What is a Singleton?

A **Singleton** ensures that a class has only ONE instance throughout your application's lifetime. It's like having a "global manager" that everyone can access, but no one can duplicate.

### Real-World Analogy
Think of a school's principal's office. There's only one principal's office in the school, and everyone who needs to access it goes to the same place. You can't create a second principal's office.

### Basic Singleton Implementation

```javascript
class DatabaseConnection {
    // Static variable to hold the single instance
    static instance = null;
    
    constructor() {
        // Prevent direct instantiation if instance already exists
        if (DatabaseConnection.instance) {
            throw new Error("DatabaseConnection is a singleton! Use getInstance()");
        }
        
        this.connectionString = "postgres://localhost:5432/myapp";
        this.isConnected = false;
        
        // Store this instance
        DatabaseConnection.instance = this;
    }
    
    // Static method to get the singleton instance
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    
    connect() {
        if (!this.isConnected) {
            console.log(`Connecting to ${this.connectionString}`);
            this.isConnected = true;
        }
    }
    
    query(sql) {
        if (!this.isConnected) {
            throw new Error("Database not connected");
        }
        console.log(`Executing: ${sql}`);
        // Simulate query execution
        return { results: [], rowCount: 0 };
    }
}

// Usage examples
try {
    // This will work - first instance
    const db1 = DatabaseConnection.getInstance();
    db1.connect();
    
    // This gets the SAME instance
    const db2 = DatabaseConnection.getInstance();
    
    console.log(db1 === db2); // true - same object!
    
    // This will throw an error
    const db3 = new DatabaseConnection(); // Error!
} catch (error) {
    console.log(error.message);
}
```

### Modern ES6 Module Singleton (Cleaner Approach)

```javascript
// database.js
class DatabaseConnection {
    constructor() {
        this.connectionString = "postgres://localhost:5432/myapp";
        this.isConnected = false;
    }
    
    connect() {
        if (!this.isConnected) {
            console.log(`Connecting to ${this.connectionString}`);
            this.isConnected = true;
        }
    }
    
    query(sql) {
        if (!this.isConnected) {
            throw new Error("Database not connected");
        }
        console.log(`Executing: ${sql}`);
        return { results: [], rowCount: 0 };
    }
}

// Create and export a single instance
const databaseInstance = new DatabaseConnection();
export default databaseInstance;

// In other files:
// import db from './database.js';
// db.connect();
// db.query("SELECT * FROM users");
```

---

## Part 3: Practical Web Development Examples (3 minutes)

### 1. Application Configuration Manager

```javascript
class AppConfig {
    static instance = null;
    
    constructor() {
        if (AppConfig.instance) {
            return AppConfig.instance;
        }
        
        this.settings = {
            apiUrl: 'https://api.myapp.com',
            theme: 'dark',
            debugMode: false
        };
        
        AppConfig.instance = this;
    }
    
    static getInstance() {
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig();
        }
        return AppConfig.instance;
    }
    
    getSetting(key) {
        return this.settings[key];
    }
    
    updateSetting(key, value) {
        this.settings[key] = value;
        console.log(`Configuration updated: ${key} = ${value}`);
    }
}

// Usage across your entire application
const config = AppConfig.getInstance();
config.updateSetting('theme', 'light');
```

### 2. Event Logger (Static Methods)

```javascript
class Logger {
    static logs = [];
    static maxLogs = 100;
    
    static log(level, message) {
        const timestamp = new Date().toISOString();
        const logEntry = { timestamp, level, message };
        
        this.logs.push(logEntry);
        
        // Keep only the most recent logs
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
        
        console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`);
    }
    
    static info(message) {
        this.log('info', message);
    }
    
    static error(message) {
        this.log('error', message);
    }
    
    static getLogs() {
        return [...this.logs]; // Return a copy
    }
    
    static clearLogs() {
        this.logs = [];
    }
}

// Usage anywhere in your application
Logger.info("User logged in");
Logger.error("Failed to save user data");
console.log(Logger.getLogs());
```

---

## Key Takeaways

### When to Use Static Methods:
- **Utility functions** that don't need instance data
- **Factory methods** for creating objects
- **Constants and configuration** that should be shared
- **Counters and metrics** across all instances

### When to Use Singletons:
- **Database connections** (expensive to create multiple)
- **Configuration managers** (one source of truth)
- **Logging systems** (centralized logging)
- **Cache managers** (shared cache across application)

### Performance Considerations:
- **Memory**: Static variables persist for the entire application lifetime
- **Testing**: Singletons can make unit testing more difficult (shared state)
- **Concurrency**: Be careful with static variables in multi-threaded environments

---

## Hands-On Exercise (Homework)

Create a `SessionManager` singleton that:
1. Tracks the current user's session
2. Has static methods for login/logout
3. Stores session data (user ID, login time, permissions)
4. Implements a session timeout feature

```javascript
// Your implementation here
class SessionManager {
    // TODO: Implement singleton pattern
    // TODO: Add login/logout functionality
    // TODO: Add session timeout handling
}
```

---

## Under the Hood: What's Really Happening?

JavaScript classes are syntactic sugar over prototype-based inheritance. When you create static methods:

```javascript
// This ES6 class...
class MyClass {
    static myMethod() { }
}

// ...is essentially equivalent to:
function MyClass() { }
MyClass.myMethod = function() { };
```

Static variables are properties attached directly to the constructor function, not to the prototype chain. This is why they're shared across all instances and persist throughout your application's lifetime.

---

## Next Week Preview
We'll explore how these patterns integrate with modern JavaScript frameworks (React, Vue) and dive deeper into module patterns and dependency injection.

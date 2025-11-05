# JavaScript Fundamentals - Part 2
## CSC317 - Week 1, Lecture 2 (75 minutes)

---

## Agenda
1. Objects and Prototypes
2. Arrays and Array Methods
3. Error Handling
4. Asynchronous JavaScript
5. ES6+ Modern Features

---

## 1. Objects and Prototypes (20 minutes)

### Creating Objects

```javascript
// Object literals
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  greet() {
    return `Hello, my name is ${this.firstName} ${this.lastName}`;
  }
};

// Accessing properties
console.log(person.firstName);           // Dot notation
console.log(person['lastName']);         // Bracket notation
const propertyName = 'age';
console.log(person[propertyName]);       // Dynamic property access

// Adding and modifying properties
person.email = 'john.doe@example.com';   // Add new property
person.age = 31;                         // Modify existing property
delete person.age;                       // Delete a property

// Object constructor
const car = new Object();
car.make = 'Toyota';
car.model = 'Corolla';
car.year = 2020;
```

### Object Methods and `this`

```javascript
const user = {
  name: 'Alice',
  greet() {
    return `Hello, I'm ${this.name}`;
  },
  greetArrow: () => {
    // 'this' doesn't work as expected in arrow functions
    return `Hello, I'm ${this.name}`;  // 'this' is from outer scope
  },
  delayedGreet() {
    // 'this' is lost in callback
    setTimeout(function() {
      console.log(`Hello, I'm ${this.name}`);  // 'this' is window/undefined
    }, 1000);
    
    // Solutions:
    // 1. Arrow function preserves 'this'
    setTimeout(() => {
      console.log(`Hello, I'm ${this.name}`);  // 'this' is user
    }, 1000);
    
    // 2. Explicit bind
    const regularFunction = function() {
      console.log(`Hello, I'm ${this.name}`);
    };
    setTimeout(regularFunction.bind(this), 1000);
  }
};
```

### Classes (ES6 - Modern Approach)

```javascript
// Class declaration
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  // Method
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  // Static method
  static createAnonymous() {
    return new Person('John', 'Doe');
  }
}

// Class inheritance
class Employee extends Person {
  constructor(firstName, lastName, position) {
    super(firstName, lastName);  // Call parent constructor
    this.position = position;
  }
  
  // Override method
  getFullName() {
    return `${super.getFullName()} (${this.position})`;
  }
  
  // New method
  getJobInfo() {
    return `Works as ${this.position}`;
  }
}

const developer = new Employee('Alice', 'Johnson', 'Developer');
console.log(developer.getFullName());  // "Alice Johnson (Developer)"
```

### Object Methods

```javascript
const person = { name: 'John', age: 30 };
const address = { city: 'New York', country: 'USA' };

// Object.keys() - get array of keys
console.log(Object.keys(person));  // ['name', 'age']

// Object.values() - get array of values
console.log(Object.values(person));  // ['John', 30]

// Object.entries() - get array of [key, value] pairs
console.log(Object.entries(person));  // [['name', 'John'], ['age', 30]]

// Object.assign() - copy properties
const combined = Object.assign({}, person, address);
// { name: 'John', age: 30, city: 'New York', country: 'USA' }

// Object.freeze() - make object immutable
Object.freeze(person);
person.age = 31;  // No effect in strict mode or silently fails
console.log(person.age);  // Still 30

// Object.seal() - prevent adding/removing properties
Object.seal(address);
address.city = 'Boston';  // Can modify existing properties
address.state = 'MA';     // Can't add new properties
```

### Prototypal Inheritance (Historical Context)

**Note:** Modern JavaScript uses ES6 classes (shown above). This section covers prototypal inheritance for understanding legacy code and JavaScript's underlying mechanisms.

```javascript
// Constructor function (old style)
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

// Adding methods to prototype
Person.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

// Creating instances
const john = new Person('John', 'Doe');
const jane = new Person('Jane', 'Smith');

console.log(john.getFullName());  // "John Doe"
console.log(jane.getFullName());  // "Jane Smith"

// Prototype inheritance (old style)
function Employee(firstName, lastName, position) {
  // Call parent constructor
  Person.call(this, firstName, lastName);
  this.position = position;
}

// Set up inheritance
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

// Add methods to child
Employee.prototype.getJobInfo = function() {
  return `${this.getFullName()} works as ${this.position}`;
};

const developer = new Employee('Bob', 'Johnson', 'Developer');
console.log(developer.getFullName());   // "Bob Johnson" (inherited)
console.log(developer.getJobInfo());    // "Bob Johnson works as Developer"

// Compare with modern ES6 class syntax:
// The ES6 class syntax shown earlier is syntactic sugar over this
// prototypal inheritance pattern. Classes are cleaner and more readable.
```

### Hands-on Exercise: Objects and Prototypes (5 minutes)
1. Create an object with properties and methods
2. Create a class with inheritance
3. Use Object methods like keys, values, entries
4. Experiment with this context in different scenarios

---

## 2. Arrays and Array Methods (15 minutes)

### Creating and Accessing Arrays

```javascript
// Array literal
const fruits = ['apple', 'banana', 'orange'];

// Array constructor
const numbers = new Array(1, 2, 3, 4, 5);

// Accessing elements
console.log(fruits[0]);  // 'apple'
console.log(fruits[fruits.length - 1]);  // 'orange' (last element)

// Modifying elements
fruits[1] = 'grape';
console.log(fruits);  // ['apple', 'grape', 'orange']

// Array properties
console.log(fruits.length);  // 3
```

### Array Methods

```javascript
const numbers = [1, 2, 3, 4, 5];
const fruits = ['apple', 'banana', 'orange', 'kiwi'];

// Adding/removing elements
fruits.push('mango');         // Add to end
fruits.unshift('strawberry'); // Add to beginning
const last = fruits.pop();    // Remove from end
const first = fruits.shift(); // Remove from beginning

// Finding elements
console.log(fruits.includes('banana'));      // true
console.log(fruits.indexOf('orange'));       // 2
console.log(fruits.indexOf('pear'));         // -1

// Joining and splitting
console.log(fruits.join(', '));              // 'apple, banana, orange, kiwi'
console.log('red,green,blue'.split(','));    // ['red', 'green', 'blue']

// Combining arrays
const combined = fruits.concat(['pear', 'grape']);
const spreadCombined = [...fruits, 'pear', 'grape'];  // Same result with spread

// Slicing and splicing
const sliced = numbers.slice(1, 4);          // [2, 3, 4]
const copied = [...numbers];                 // Copy array with spread
numbers.splice(2, 1, 10, 11);                // Replace elements
```

### Iterating Over Arrays

```javascript
const colors = ['red', 'green', 'blue'];

// for loop
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}

// for...of loop
for (const color of colors) {
  console.log(color);
}

// forEach method
colors.forEach((color, index) => {
  console.log(`${index}: ${color}`);
});
```

### Array Transformation Methods

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(num => num * 2);
// [2, 4, 6, 8, 10]

// filter - keep elements that pass test
const evens = numbers.filter(num => num % 2 === 0);
// [2, 4]

// reduce - combine elements into single value
const sum = numbers.reduce((total, num) => total + num, 0);
// 15 (1+2+3+4+5)

const product = numbers.reduce((result, num) => result * num, 1);
// 120 (1*2*3*4*5)

// find - get first element that passes test
const firstEven = numbers.find(num => num % 2 === 0);
// 2

// some/every - test if some/all elements pass test
const hasEven = numbers.some(num => num % 2 === 0);    // true
const allPositive = numbers.every(num => num > 0);     // true

// sort - arrange elements
const unsorted = [3, 1, 4, 1, 5];
unsorted.sort();  // [1, 1, 3, 4, 5]

// Custom sort (for numbers)
const scores = [10, 5, 20, 15];
scores.sort((a, b) => a - b);  // Ascending: [5, 10, 15, 20]
scores.sort((a, b) => b - a);  // Descending: [20, 15, 10, 5]
```

### Chaining Array Methods

```javascript
const transactions = [
  { id: 1, amount: 100, type: 'purchase' },
  { id: 2, amount: 50, type: 'refund' },
  { id: 3, amount: 200, type: 'purchase' },
  { id: 4, amount: 25, type: 'fee' }
];

// Get total of all purchases
const purchaseTotal = transactions
  .filter(t => t.type === 'purchase')
  .map(t => t.amount)
  .reduce((total, amount) => total + amount, 0);
// 300 (100 + 200)
```

### Hands-on Exercise: Arrays (5 minutes)
1. Create an array and use various methods to add/remove elements
2. Transform an array using map, filter, and reduce
3. Sort an array of objects based on a property
4. Practice method chaining to process an array

---

## 3. Error Handling (10 minutes)

### Try-Catch-Finally

```javascript
try {
  // Code that might throw an error
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  // Handle the error
  console.error('An error occurred:', error.message);
} finally {
  // Always executed, regardless of error
  console.log('Cleanup operations');
}
```

### Error Types

```javascript
// Built-in error types
try {
  // ReferenceError
  console.log(undefinedVariable);
} catch (error) {
  console.log(error.name);    // "ReferenceError"
  console.log(error.message); // "undefinedVariable is not defined"
}

try {
  // TypeError
  const obj = null;
  console.log(obj.property);
} catch (error) {
  console.log(error.name);    // "TypeError"
  console.log(error.message); // "Cannot read property 'property' of null"
}

try {
  // SyntaxError (cannot be caught at runtime, occurs during parsing)
  eval('if (true) { console.log("Missing closing brace")');
} catch (error) {
  console.log(error.name);    // "SyntaxError"
}
```

### Throwing Errors

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

try {
  console.log(divide(10, 2));  // 5
  console.log(divide(10, 0));  // Throws Error
} catch (error) {
  console.error(error.message);  // "Division by zero"
}

// Custom error types
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new ValidationError('Name is required');
  }
  if (!user.email) {
    throw new ValidationError('Email is required');
  }
}

try {
  validateUser({ name: 'John' });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Validation failed:', error.message);
  } else {
    console.log('Unknown error:', error.message);
  }
}
```

### Error Handling Best Practices

```javascript
// Only catch what you can handle
function processData(data) {
  try {
    // Only the data processing might throw errors
    return parseAndTransform(data);
  } catch (error) {
    // Log the error for debugging
    console.error('Data processing failed:', error);
    
    // Return a default value or rethrow
    if (error.name === 'SyntaxError') {
      return { error: 'Invalid data format' };
    }
    
    // Rethrow errors we can't handle
    throw error;
  }
}
```

### Hands-on Exercise: Error Handling (5 minutes)
1. Write a try-catch block to handle a potential error
2. Create a custom error class
3. Throw and catch different types of errors
4. Practice proper error handling patterns

---

## 4. Asynchronous JavaScript (20 minutes)

### Understanding Asynchronous Code

JavaScript is single-threaded but can handle asynchronous operations using the event loop.

```javascript
console.log('First');

setTimeout(() => {
  console.log('Second (after 1 second)');
}, 1000);

console.log('Third');

// Output:
// First
// Third
// Second (after 1 second)
```

### Callbacks

```javascript
// Callback pattern (older style)
const fetchData = (callback) => {
  setTimeout(() => {
    const data = { id: 1, name: 'John' };
    callback(null, data);  // Convention: error first, then data
  }, 1000);
};

fetchData((error, data) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Data:', data);
});

// Callback hell problem
fetchUser((error, user) => {
  if (error) return console.error(error);
  fetchPosts(user.id, (error, posts) => {
    if (error) return console.error(error);
    fetchComments(posts[0].id, (error, comments) => {
      if (error) return console.error(error);
      console.log(comments);  // Deeply nested!
    });
  });
});
```

### Promises

Promises provide a cleaner way to handle asynchronous operations.

```javascript
// Creating a Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve({ id: 1, name: 'John' });
      } else {
        reject(new Error('Failed to fetch data'));
      }
    }, 1000);
  });
};

// Using a Promise
fetchData()
  .then(data => {
    console.log('Data:', data);
    return data.id;
  })
  .then(id => {
    console.log('User ID:', id);
  })
  .catch(error => {
    console.error('Error:', error.message);
  })
  .finally(() => {
    console.log('Cleanup operations');
  });

// Promise chaining (solves callback hell)
fetchUser()
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(error => console.error('Error in chain:', error));
```

### Promise Methods

```javascript
// Promise.all - wait for all promises to resolve
const promise1 = Promise.resolve(10);
const promise2 = Promise.resolve(20);
const promise3 = Promise.resolve(30);

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values);  // [10, 20, 30]
    const sum = values.reduce((a, b) => a + b, 0);
    console.log('Sum:', sum);  // 60
  });

// Promise.race - first promise to settle wins
Promise.race([promise1, promise2, promise3])
  .then(value => {
    console.log('First to resolve:', value);
  });

// Promise.allSettled - wait for all to complete (ES2020)
const mixed = [
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
];

Promise.allSettled(mixed)
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
      } else {
        console.log('Failed:', result.reason);
      }
    });
  });

// Promise.any - first fulfilled promise (ES2021)
Promise.any([
  Promise.reject('error 1'),
  Promise.resolve('success!'),
  Promise.resolve('also success')
])
  .then(value => console.log(value))  // "success!"
  .catch(err => console.error(err));
```

### Async/Await (Modern Approach)

Async/await provides synchronous-looking code for asynchronous operations.

```javascript
// Function returning a Promise
const fetchUser = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'Alice', email: 'alice@example.com' });
    }, 1000);
  });
};

const fetchPosts = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, userId, title: 'Post 1' },
        { id: 2, userId, title: 'Post 2' }
      ]);
    }, 1000);
  });
};

// Using async/await
const getUserData = async (userId) => {
  try {
    // Wait for user data
    const user = await fetchUser(userId);
    console.log('User:', user);

    // Wait for posts
    const posts = await fetchPosts(user.id);
    console.log('Posts:', posts);

    return { user, posts };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;  // Re-throw for caller to handle
  }
};

// Calling async function
getUserData(1)
  .then(data => console.log('Complete data:', data))
  .catch(error => console.error('Failed:', error));

// Or use await at top level (in modules)
// const data = await getUserData(1);
```

### Async/Await Error Handling

```javascript
const fetchDataWithRetry = async (url, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error.message);

      if (i === retries - 1) {
        throw error;  // Last attempt failed
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};
```

### Parallel vs Sequential Async Operations

```javascript
// Sequential (slower - waits for each)
const sequential = async () => {
  const user1 = await fetchUser(1);     // Wait 1 second
  const user2 = await fetchUser(2);     // Wait another 1 second
  const user3 = await fetchUser(3);     // Wait another 1 second
  // Total: 3 seconds
  return [user1, user2, user3];
};

// Parallel (faster - all at once)
const parallel = async () => {
  const [user1, user2, user3] = await Promise.all([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
  ]);
  // Total: 1 second (all run simultaneously)
  return [user1, user2, user3];
};

// Mixed approach (some sequential, some parallel)
const mixed = async () => {
  // First get user (must happen first)
  const user = await fetchUser(1);

  // Then get posts and friends in parallel
  const [posts, friends] = await Promise.all([
    fetchPosts(user.id),
    fetchFriends(user.id)
  ]);

  return { user, posts, friends };
};
```

### Hands-on Exercise: Asynchronous JavaScript (5 minutes)
1. Create a Promise that resolves after a delay
2. Chain multiple promises together
3. Convert promise chain to async/await
4. Handle errors in async functions
5. Run multiple async operations in parallel

---

## 5. ES6+ Modern Features (10 minutes)

### Destructuring

```javascript
// Array destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(first);   // 1
console.log(second);  // 2
console.log(rest);    // [3, 4, 5]

// Skip elements
const [a, , c] = numbers;
console.log(a, c);  // 1 3

// Object destructuring
const user = {
  name: 'Alice',
  age: 28,
  email: 'alice@example.com',
  city: 'New York'
};

const { name, age, ...other } = user;
console.log(name);   // 'Alice'
console.log(other);  // { email: '...', city: 'New York' }

// Rename while destructuring
const { name: userName, age: userAge } = user;
console.log(userName);  // 'Alice'

// Default values
const { country = 'USA' } = user;
console.log(country);  // 'USA'

// Nested destructuring
const employee = {
  name: 'Bob',
  position: {
    title: 'Developer',
    level: 'Senior'
  }
};

const { position: { title, level } } = employee;
console.log(title, level);  // 'Developer' 'Senior'
```

### Spread and Rest Operators

```javascript
// Spread with arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];  // [1, 2, 3, 4, 5, 6]

// Clone array
const original = [1, 2, 3];
const copy = [...original];

// Spread with objects
const person = { name: 'John', age: 30 };
const employee = { ...person, jobTitle: 'Developer' };
// { name: 'John', age: 30, jobTitle: 'Developer' }

// Override properties
const updated = { ...person, age: 31 };
// { name: 'John', age: 31 }

// Rest parameters in functions
const sum = (...numbers) => {
  return numbers.reduce((total, num) => total + num, 0);
};

console.log(sum(1, 2, 3, 4, 5));  // 15
```

### Template Literals

```javascript
const name = 'Alice';
const age = 28;

// Basic interpolation
const greeting = `Hello, ${name}!`;

// Multi-line strings
const message = `
  Hello ${name},
  You are ${age} years old.
  Welcome to our platform!
`;

// Expressions in template literals
const price = 19.99;
const quantity = 3;
console.log(`Total: $${(price * quantity).toFixed(2)}`);

// Tagged templates (advanced)
const highlight = (strings, ...values) => {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<strong>${values[i]}</strong>` : '');
  }, '');
};

const text = highlight`User ${name} is ${age} years old`;
// "User <strong>Alice</strong> is <strong>28</strong> years old"
```

### Enhanced Object Literals

```javascript
const name = 'Alice';
const age = 28;

// Property shorthand
const user = { name, age };  // Same as { name: name, age: age }

// Method shorthand
const calculator = {
  value: 0,
  add(n) {  // Same as: add: function(n)
    this.value += n;
    return this;
  },
  multiply(n) {
    this.value *= n;
    return this;
  }
};

// Computed property names
const propName = 'email';
const user2 = {
  name: 'Bob',
  [propName]: 'bob@example.com',  // Dynamic property name
  [`get${propName}`]: () => 'bob@example.com'  // getEmail method
};
```

### Default Parameters

```javascript
// Old way
function greet(name, greeting) {
  name = name || 'Guest';
  greeting = greeting || 'Hello';
  return `${greeting}, ${name}!`;
}

// Modern way
const greet2 = (name = 'Guest', greeting = 'Hello') => {
  return `${greeting}, ${name}!`;
};

console.log(greet2());                    // "Hello, Guest!"
console.log(greet2('Alice'));             // "Hello, Alice!"
console.log(greet2('Bob', 'Hi'));         // "Hi, Bob!"

// Default can be expressions
const generateId = () => Math.random().toString(36).substr(2, 9);

const createUser = (name, id = generateId()) => {
  return { name, id };
};
```

### Optional Chaining and Nullish Coalescing

```javascript
const user = {
  name: 'Alice',
  address: {
    city: 'New York'
    // No 'street' property
  }
};

// Optional chaining (?.)
const street = user?.address?.street;  // undefined (no error)
const zip = user?.address?.zip?.code;  // undefined (no error)

// With methods
const result = user.getData?.();  // Only calls if getData exists

// With arrays
const firstFriend = user.friends?.[0];  // undefined (no error)

// Nullish coalescing (??)
const port = process.env.PORT ?? 3000;  // Use 3000 if PORT is null/undefined

// Difference between || and ??
const value1 = 0 || 10;   // 10 (0 is falsy)
const value2 = 0 ?? 10;   // 0 (0 is not nullish)

const value3 = '' || 'default';   // 'default' ('' is falsy)
const value4 = '' ?? 'default';   // '' ('' is not nullish)
```

### Hands-on Exercise: ES6+ Features (5 minutes)
1. Practice destructuring objects and arrays
2. Use spread operator to combine arrays and objects
3. Create functions with default parameters
4. Use optional chaining with nested objects
5. Write template literals with expressions

---

## Summary

In this lecture, we've covered:
1. Objects, classes, and prototypal inheritance in JavaScript
2. Arrays and their powerful transformation methods
3. Error handling with try-catch and custom errors
4. Asynchronous JavaScript with callbacks, Promises, and async/await
5. Modern ES6+ features like destructuring, spread, and optional chaining

## Next Lecture

In our next lecture, we'll explore:
- Introduction to Node.js and backend development
- Working with modules (CommonJS and ES Modules)
- Building HTTP servers
- File system operations
- Working with npm and packages

---

## Additional Resources

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript.info - Async/Await](https://javascript.info/async-await)
- [MDN - Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [You Don't Know JS - Async & Performance](https://github.com/getify/You-Dont-Know-JS/tree/1st-ed/async%20%26%20performance)
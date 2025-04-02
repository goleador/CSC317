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

### Prototypes and Inheritance

```javascript
// Constructor function
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

// Prototype inheritance
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
```

### Classes (ES6)

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
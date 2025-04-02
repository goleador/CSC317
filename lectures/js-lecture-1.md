# JavaScript Fundamentals - Part 1
## CSC317 - Week 1, Lecture 1 (75 minutes)

---

## Agenda
1. Variables and Data Types
2. Operators
3. Control Structures
4. Functions
5. Scope and Closures

---

## 1. Variables and Data Types (20 minutes)

### Variable Declarations
```javascript
// var - function scoped, hoisted (legacy)
var x = 10;

// let - block scoped, not hoisted (modern)
let y = 20;

// const - block scoped, cannot be reassigned (modern)
const z = 30;
```

**Best Practices:**
- Use `const` by default
- Use `let` when you need to reassign
- Avoid `var` in modern JavaScript

### Primitive Data Types

```javascript
// Number
let num = 42;
let float = 3.14;
let infinity = Infinity;
let notANumber = NaN;

// String
let name = "John";
let greeting = 'Hello';
let template = `Hello, ${name}!`; // Template literals (ES6)

// Boolean
let isActive = true;
let isComplete = false;

// Undefined & Null
let notDefined;         // undefined
let emptyValue = null;  // null

// Symbol (ES6)
const uniqueKey = Symbol('description');

// BigInt (ES2020)
const bigNumber = 9007199254740991n;
```

### Reference Data Types

```javascript
// Object
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  greet() {
    return `Hello, my name is ${this.firstName}`;
  }
};

// Array
const fruits = ['apple', 'banana', 'orange'];
const mixed = [1, 'two', { three: 3 }, [4]];

// Date
const today = new Date();

// Regular Expression
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Map, Set, WeakMap, WeakSet (ES6)
const map = new Map();
const set = new Set([1, 2, 3]);
```

### Type Coercion & Checking

```javascript
// Type coercion
console.log(5 + '5');        // '55' (number becomes string)
console.log('5' - 2);        // 3 (string becomes number)
console.log(Boolean(1));     // true
console.log(Boolean(''));    // false

// Type checking
console.log(typeof 42);            // 'number'
console.log(typeof 'hello');       // 'string'
console.log(typeof true);          // 'boolean'
console.log(typeof undefined);     // 'undefined'
console.log(typeof {});            // 'object'
console.log(typeof []);            // 'object' (arrays are objects!)

// Better array checking
console.log(Array.isArray([]));    // true
console.log(Array.isArray({}));    // false
```

### Hands-on Exercise: Data Types (5 minutes)
1. Create variables of each primitive type
2. Create an object representing a student
3. Create an array of mixed data types
4. Test type coercion with different operations

---

## 2. Operators (15 minutes)

### Arithmetic Operators
```javascript
let a = 10;
let b = 3;

console.log(a + b);    // Addition: 13
console.log(a - b);    // Subtraction: 7
console.log(a * b);    // Multiplication: 30
console.log(a / b);    // Division: 3.3333...
console.log(a % b);    // Remainder: 1
console.log(a ** b);   // Exponentiation: 1000 (ES2016)

// Increment & Decrement
let c = 5;
console.log(c++);      // 5 (returns then increments)
console.log(++c);      // 7 (increments then returns)
console.log(c--);      // 7 (returns then decrements)
console.log(--c);      // 5 (decrements then returns)
```

### Comparison Operators
```javascript
let a = 10;
let b = '10';

// Equality
console.log(a == b);   // true (loose equality, type coercion)
console.log(a === b);  // false (strict equality, no type coercion)

// Inequality
console.log(a != b);   // false (loose inequality)
console.log(a !== b);  // true (strict inequality)

// Greater/Less Than
console.log(a > 5);    // true
console.log(a < 5);    // false
console.log(a >= 10);  // true
console.log(a <= 10);  // true
```

### Logical Operators
```javascript
let isLoggedIn = true;
let isAdmin = false;

console.log(isLoggedIn && isAdmin);  // AND: false
console.log(isLoggedIn || isAdmin);  // OR: true
console.log(!isLoggedIn);            // NOT: false

// Short-circuit evaluation
let username = null;
let displayName = username || 'Guest';  // 'Guest'

// Nullish coalescing operator (ES2020)
let value = null;
let defaultValue = value ?? 'Default';  // 'Default'
// Only nullish values (null, undefined) trigger the default
```

### Assignment Operators
```javascript
let x = 10;

x += 5;   // x = x + 5
x -= 3;   // x = x - 3
x *= 2;   // x = x * 2
x /= 4;   // x = x / 4
x %= 3;   // x = x % 3
x **= 2;  // x = x ** 2
```

### Other Important Operators
```javascript
// Ternary operator
let age = 20;
let message = age >= 18 ? 'Adult' : 'Minor';

// Optional chaining (ES2020)
const user = { 
  profile: null 
};
const city = user.profile?.address?.city; // undefined (no error)

// Spread operator (ES6)
const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5];  // [1, 2, 3, 4, 5]

const person = { name: 'John', age: 30 };
const employee = { ...person, jobTitle: 'Developer' };

// Destructuring (ES6)
const { name, age } = person;
const [first, second] = numbers;
```

### Hands-on Exercise: Operators (5 minutes)
1. Create expressions using each type of operator
2. Experiment with loose vs. strict equality
3. Try short-circuit evaluation and nullish coalescing
4. Practice destructuring an object and array

---

## 3. Control Structures (15 minutes)

### Conditional Statements

```javascript
// if...else
let hour = 14;

if (hour < 12) {
  console.log('Good morning');
} else if (hour < 18) {
  console.log('Good afternoon');
} else {
  console.log('Good evening');
}

// switch
let day = 'Monday';

switch (day) {
  case 'Monday':
    console.log('Start of work week');
    break;
  case 'Friday':
    console.log('End of work week');
    break;
  case 'Saturday':
  case 'Sunday':
    console.log('Weekend');
    break;
  default:
    console.log('Midweek');
    break;
}
```

### Loops

```javascript
// for loop
for (let i = 0; i < 5; i++) {
  console.log(`Iteration ${i}`);
}

// while loop
let count = 0;
while (count < 5) {
  console.log(`Count: ${count}`);
  count++;
}

// do...while loop
let num = 0;
do {
  console.log(`Number: ${num}`);
  num++;
} while (num < 5);

// for...of loop (for iterables like arrays)
const colors = ['red', 'green', 'blue'];
for (const color of colors) {
  console.log(color);
}

// for...in loop (for object properties)
const person = { name: 'John', age: 30, job: 'developer' };
for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}
```

### Loop Control

```javascript
// break
for (let i = 0; i < 10; i++) {
  if (i === 5) break;  // exits loop when i is 5
  console.log(i);
}

// continue
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) continue;  // skips even numbers
  console.log(i);
}

// labeled statements
outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outerLoop;  // breaks out of both loops
    }
    console.log(`i: ${i}, j: ${j}`);
  }
}
```

### Hands-on Exercise: Control Structures (5 minutes)
1. Write an if...else statement to categorize ages
2. Create a switch statement to handle different user roles
3. Write a for loop that prints even numbers from 0 to 20
4. Use a for...of loop to sum all numbers in an array

---

## 4. Functions (15 minutes)

### Function Declarations & Expressions

```javascript
// Function declaration (hoisted)
function greet(name) {
  return `Hello, ${name}!`;
}

// Function expression (not hoisted)
const sayHello = function(name) {
  return `Hello, ${name}!`;
};

// Arrow function (ES6)
const welcome = (name) => {
  return `Welcome, ${name}!`;
};

// Simplified arrow function (single statement)
const shortWelcome = name => `Welcome, ${name}!`;

// Immediately Invoked Function Expression (IIFE)
(function() {
  console.log('This runs immediately!');
})();
```

### Parameters & Arguments

```javascript
// Default parameters (ES6)
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}

console.log(greet());        // "Hello, Guest!"
console.log(greet('John'));  // "Hello, John!"

// Rest parameters (ES6)
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4));  // 10

// Destructuring parameters (ES6)
function printPerson({ name, age }) {
  console.log(`${name} is ${age} years old`);
}

printPerson({ name: 'Alice', age: 28 });  // "Alice is 28 years old"
```

### Higher-Order Functions

```javascript
// Function that returns a function
function createMultiplier(factor) {
  // This returned function is a closure
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
console.log(double(5));  // 10

// Function that takes a function as an argument
function executeOperation(operation, a, b) {
  return operation(a, b);
}

const add = (x, y) => x + y;
console.log(executeOperation(add, 5, 3));  // 8
```

### Recursion

```javascript
// Factorial calculation using recursion
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5));  // 120 (5 * 4 * 3 * 2 * 1)

// Fibonacci sequence using recursion
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(7));  // 13
```

### Hands-on Exercise: Functions (5 minutes)
1. Create a function declaration and a function expression
2. Write an arrow function with default parameters
3. Create a higher-order function that takes a callback
4. Write a simple recursive function

---

## 5. Scope and Closures (10 minutes)

### Scope Levels

```javascript
// Global scope
const globalVar = 'I am global';

function outerFunction() {
  // Function scope
  const outerVar = 'I am from outer';
  
  if (true) {
    // Block scope (let and const)
    let blockVar = 'I am from block';
    var functionScopedVar = 'I am function scoped';
    
    console.log(globalVar);        // Accessible
    console.log(outerVar);         // Accessible
    console.log(blockVar);         // Accessible
    console.log(functionScopedVar); // Accessible
  }
  
  console.log(globalVar);          // Accessible
  console.log(outerVar);           // Accessible
  // console.log(blockVar);        // Error - not accessible
  console.log(functionScopedVar);   // Accessible (var is function scoped)
}

console.log(globalVar);            // Accessible
// console.log(outerVar);          // Error - not accessible
// console.log(blockVar);          // Error - not accessible
// console.log(functionScopedVar);  // Error - not accessible
```

### Lexical Scope

```javascript
function outer() {
  const message = 'Hello from outer!';
  
  function inner() {
    // inner() has access to message via lexical scope
    console.log(message);
  }
  
  inner();
}

outer();  // "Hello from outer!"
```

### Closures

```javascript
function createCounter() {
  let count = 0;  // Private variable
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.decrement());  // 1
console.log(counter.getCount());   // 1

// count is encapsulated and not directly accessible
// console.log(counter.count);     // undefined
```

### Practical Uses of Closures

```javascript
// Function factories
function createGreeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = createGreeter('Hello');
const sayHi = createGreeter('Hi');

console.log(sayHello('John'));  // "Hello, John!"
console.log(sayHi('Alice'));    // "Hi, Alice!"

// Event handlers with data
function setupButton(buttonId, message) {
  document.getElementById(buttonId).addEventListener('click', function() {
    // This handler forms a closure around message
    alert(message);
  });
}

setupButton('btn1', 'Button 1 was clicked!');
setupButton('btn2', 'Button 2 was clicked!');

// Private variables using the module pattern
const calculator = (function() {
  // Private variables
  let result = 0;
  
  // Return public API
  return {
    add(x) {
      result += x;
      return this;
    },
    subtract(x) {
      result -= x;
      return this;
    },
    getResult() {
      return result;
    }
  };
})();

calculator.add(5).subtract(2);
console.log(calculator.getResult());  // 3
```

### Hands-on Exercise: Scope & Closures (5 minutes)
1. Create a function that demonstrates lexical scope
2. Write a closure that maintains a private counter
3. Create a simple function factory using closures
4. Implement a module pattern with private and public methods

---

## Summary
In this lecture, we've covered:
1. Variables and data types in JavaScript
2. Operators and expressions
3. Control structures for flow control
4. Function declarations, expressions, and arrow functions
5. Scope and closures for encapsulation

## Next Lecture
In our next lecture, we'll explore:
- Objects and Prototypes
- Arrays and Array Methods
- Error Handling
- Asynchronous JavaScript
- ES6+ Modern Features

---

## Additional Resources
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://javascript.info/)
- [Eloquent JavaScript](https://eloquentjavascript.net/)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
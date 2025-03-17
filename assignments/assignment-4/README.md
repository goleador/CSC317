# Assignment 4: The Exciting World of JavaScript
**Due: Wednesday**  
**This part is ungraded but required for subsequent parts**

## Part 0 - Environment Setup
This is Part 0 of Assignment 4: "The Exciting World of JavaScript", focused on setting up your JavaScript development environment. While this part will not be graded, it's essential to complete it before moving on to the graded portions of the assignment. The goal is to ensure everyone has a working JavaScript environment before we dive deeper into programming concepts.

## Required Tasks

### 1. Installing Node.js
If you don't already have Node.js installed:

1. Visit the official Node.js website: https://nodejs.org/
2. Download the LTS (Long Term Support) version recommended for most users
3. Follow the installation instructions for your operating system:
   - **Windows**: Run the downloaded installer and follow the prompts
   - **Mac**: Run the downloaded pkg installer or use Homebrew with `brew install node`
   - **Linux**: Use your distribution's package manager (e.g., `apt install nodejs npm` for Ubuntu)

4. Verify installation by opening a terminal/command prompt and typing:
   ```
   node -v
   npm -v
   ```
   
   Both commands should display version numbers if installation was successful

### 2. "Hello JavaScript" Program
Create a simple JavaScript file (`hello.js`) that:
- Outputs "Hello, JavaScript!" to the console
- Includes at least one variable
- Includes at least one function 
- Uses at least one ES6+ feature (arrow function, template literal, etc.)

Example:
```javascript
// hello.js
const greeting = "JavaScript";

const createMessage = (name) => {
    return `Hello, ${name}!`;
};

console.log(createMessage(greeting));
```

Run your JavaScript file using Node.js:
1. Open a terminal/command prompt
2. Navigate to the directory containing your `hello.js` file
3. Run the file with:
   ```
   node hello.js
   ```
4. You should see your output message in the terminal

### 3. Browser Experiment
Create a simple HTML page that:
- Links to your JavaScript file
- Contains a button that, when clicked, calls a function from your JavaScript file
- Displays some dynamic content on the page when the button is clicked

Example HTML:
```html
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Practice</title>
</head>
<body>
    <h1>JavaScript Week 0 Practice</h1>
    <button id="greetButton">Click Me!</button>
    <div id="output"></div>
    
    <script src="hello.js"></script>
    <script>
        document.getElementById("greetButton").addEventListener("click", function() {
            document.getElementById("output").textContent = createMessage("JavaScript");
        });
    </script>
</body>
</html>
```

### 4. Explore Browser DevTools
- Open your HTML page in Chrome or Firefox
- Open the developer tools (F12)
- Experiment with:
  - Running JavaScript in the console
  - Inspecting DOM elements
  - Setting breakpoints in your JavaScript code
  - Viewing network requests

## Submission
While this part is ungraded, you should complete it by Wednesday to be prepared for the next parts of Assignment 4. You do not need to submit anything for this part, but make sure to keep your files for reference and further development in upcoming parts.

## Troubleshooting Common Issues

### Node.js Installation Problems
- **Windows**: Make sure to run the installer as administrator
- **Mac**: If using Homebrew, make sure brew is updated with `brew update`
- **Linux**: You might need to add `sudo` before installation commands

### JavaScript File Not Running
- Make sure you're in the correct directory when running `node hello.js`
- Check file permissions (especially on Mac/Linux)
- Verify there are no syntax errors in your code

### Browser Integration Issues
- Check browser console (F12) for any error messages
- Ensure the file path to your JavaScript is correct
- Try using a different browser if problems persist

## Resources

### Documentation
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://javascript.info/)

### Tools
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)

### Online Playground
If you're having trouble with your local setup, try these online environments:
- [CodePen](https://codepen.io/)
- [JSFiddle](https://jsfiddle.net/)
- [Replit](https://replit.com/)

## Questions?
If you encounter any issues with this setup process, please post in the class Discord channel or bring your questions to the next lecture.
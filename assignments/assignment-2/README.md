# HTML Personal Portfolio Website Assignment

## Overview
In this assignment, you will create a personal portfolio website using HTML. The assignment is divided into four parts, each building upon concepts learned in the corresponding lecture. By the end, you will have a functional personal website that demonstrates your understanding of HTML fundamentals and best practices.

## Learning Objectives
- Master HTML5 fundamentals and semantic structure
- Understand and implement proper document structure
- Create accessible and well-organized content
- Apply HTML best practices for web development

## Assignment Schedule

### Recommended Completion Schedule
- Part 0 & 1: Complete after first HTML lecture
- Part 2: Complete after second HTML lecture
- Part 3: Complete after third HTML lecture
- Part 4: Complete after fourth HTML lecture

While you can complete all parts by the final deadline, following this schedule will:
- Allow you to ask questions during the next class
- Give you time to address any issues
- Help you avoid last-minute problems
- Build your portfolio progressively

### Final Deadline
**Due Date: February 21, 2024**

### Late Policy
- Submissions up to 4 days late are accepted with grade penalties:
  - 1 day late: -5% maximum grade (95% max)
  - 2 days late: -10% maximum grade (90% max)
  - 3 days late: -15% maximum grade (85% max)
  - 4 days late: -20% maximum grade (80% max)
  - After 4 days: No submissions accepted

### Submission Requirements
1. Complete all parts (0-4) of the assignment
2. Ensure your repository includes:
   - All HTML files
   - Images used in your portfolio
   - SUBMISSION.md file using [this template](https://github.com/goleador/CSC317/blob/main/assignments/assignment-2/SUBMISSION.md)
3. Verify your code:
   - Test that all pages load correctly
   - Confirm all links work
   - Check that all images display properly
4. Final steps:
   - Commit all changes: `git commit -m "Final submission for Assignment 2"`
   - Push to GitHub: `git push origin main`
   - Submit your repository link on Canvas



---
# HTML Personal Portfolio Website Assignment

## Overview
In this assignment, you will create a professional portfolio website to showcase your skills, experience, and projects. The assignment is divided into four parts, each building upon the previous one. By the end, you will have a fully functional personal website that you can continue to use and enhance throughout your career.

## Learning Objectives
- Implement modern HTML and CSS practices
- Create responsive web layouts
- Build interactive components using JavaScript
- Structure and organize web content effectively
- Apply best practices in web development

## Assignment Structure
This assignment will be completed over four parts, corresponding with our lectures. Each part builds upon the previous section, ultimately creating a cohesive personal portfolio website.

---

## Part 0: Repository Setup
Before starting the assignment, you need to set up your repository structure correctly:

1. Open your terminal/command prompt

2. Navigate to your CSC317 repository:
```bash
cd path/to/your/CSC317
```

3. Create the assignments directory (if it doesn't exist):
```bash
mkdir -p assignments
```

4. Create and navigate to assignment-2 directory:
```bash
cd assignments
mkdir assignment-2
cd assignment-2
```

5. Initialize git tracking (if not already done):
```bash
git status # Check if you're in a git repository
```

6. Create the basic file structure:
```bash
touch index.html
mkdir images
```

Your folder structure should look like this:
```
CSC317/
└── assignments/
    └── assignment-2/
        ├── index.html
        └── images/
```

7. Stage and commit your changes:
```bash
git add .
git commit -m "Initialize assignment-2 structure"
git push origin main
```

Remember to commit your changes regularly as you work on the assignment. Use meaningful commit messages that describe what you've changed.

---

## Part 1: Basic HTML Structure and Personal Information
**Due: After HTML Fundamentals Lecture**

Create the foundation of your portfolio website using basic HTML elements:

**Requirements:**
1. Create an HTML5 document with:
    - Proper DOCTYPE declaration
    - HTML, head, and body elements
    - Appropriate meta charset declaration
2. Add your personal information using:
    - Heading elements (h1-h6) for your name and section titles
    - Paragraphs (`<p>`) for your bio information
    - Line breaks (`<br>`) where appropriate
3. Include:
    - Your name (as main heading)
    - School name
    - Hometown
4. Add navigation using:
    - Anchor tags (`<a>`) for future section links
5. Include at least two relevant images:
    - Professional photo (optional)
    - School logo
    - Hometown image

**Example Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Name - Portfolio</title>
</head>
<body>
    <h1>Your Name</h1>
    <img src="profile.jpg" alt="Your Name's profile picture">
    
    <h2>About Me</h2>
    <p>Currently attending [School Name]</p>
    <p>From [Hometown]</p>
    
    <!-- Navigation links -->
    <a href="#education">Education</a>
    <a href="#experience">Experience</a>
    <!-- More links... -->
</body>
</html>
```

---

## Part 2: Education, Experience, and Initial Styling
**Due: After HTML Page Structure & Styling Lecture**

Build upon Part 1 by adding structured content using lists and tables, and introduce basic styling:

**Requirements:**
1. Create an education section using:
    - Unordered lists for degrees/certifications
    - Table for courses/achievements
2. Add experience section using:
    - Ordered list for work history
    - Tables for detailed job information
3. Implement basic inline styles for:
    - Text alignment
    - Background colors
    - Font sizes
4. Add proper id attributes to sections
5. Include a basic contact form with:
    - Name input
    - Email input
    - Subject input
    - Message textarea
    - Submit button

**Example Structure:**
```html
<h2 id="education">Education</h2>
<ul>
    <li style="font-size: 18px;">Current University
        <ul>
            <li>Major: Computer Science</li>
            <li>Expected Graduation: 2025</li>
        </ul>
    </li>
</ul>

<h2 id="experience">Experience</h2>
<table border="1">
    <tr>
        <th>Position</th>
        <th>Company</th>
        <th>Dates</th>
    </tr>
    <tr>
        <td>Software Intern</td>
        <td>Tech Corp</td>
        <td>June 2023 - August 2023</td>
    </tr>
</table>
```

---

## Part 3: Layout and Structure Enhancement
**Due: After Layout & Modern HTML Lecture**

Enhance your portfolio with semantic HTML and improved structure:

**Requirements:**
1. Implement semantic HTML5 elements:
    - `<header>` for the top section
    - `<nav>` for navigation
    - `<main>` for primary content
    - `<section>` for different content areas
    - `<article>` for projects
    - `<footer>` for contact information
2. Add responsive design elements:
    - Viewport meta tag
    - Percentage-based widths
3. Enhance the contact form with:
    - Form validation attributes
    - Required fields
    - Appropriate input types
4. Create a projects section using semantic elements

**Example Structure:**
```html
<header>
    <h1>Your Name</h1>
    <nav>
        <!-- Navigation links -->
    </nav>
</header>

<main>
    <section id="projects">
        <article>
            <h3>Project Title</h3>
            <img src="project1.jpg" alt="Project 1 screenshot">
            <p>Project description...</p>
        </article>
    </section>
</main>

<footer>
    <form id="contact">
        <label for="email">Email:</label>
        <input type="email" id="email" required>
        <!-- More form fields... -->
    </form>
</footer>
```

---

## Part 4: Advanced Features and Final Polish
**Due: After Interactive & Advanced Features Lecture**

Complete your portfolio with advanced HTML features:

**Requirements:**
1. Add multimedia elements:
    - Embed a YouTube video introduction (optional)
    - Include audio elements if relevant
2. Implement iframes for:
    - GitHub project previews
    - Google Maps location
3. Add metadata in the head:
    - Description
    - Keywords
    - Author
    - Favicon
4. Create an extra curricular section (Extra Credit)
5. Ensure proper file organization
6. Add HTML entities where appropriate

**Example Structure:**
```html
<head>
    <meta name="description" content="Personal portfolio of [Your Name]">
    <meta name="keywords" content="portfolio, web development, student">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>

<!-- Embedded content -->
<iframe width="560" height="315" 
    src="https://www.youtube.com/embed/your-video-id"
    title="Portfolio Introduction">
</iframe>

<!-- Entity usage -->
<p>&copy; 2025 Your Name &bull; All rights reserved</p>
```

## Grading Criteria
- Part 1: 25%
    - Proper HTML structure (15%)
    - Content organization (10%)

- Part 2: 25%
    - Lists and tables implementation (15%)
    - Form structure (10%)

- Part 3: 25%
    - Semantic HTML usage (15%)
    - Form validation (10%)

- Part 4: 25%
    - Advanced features implementation (15%)
    - Overall organization (10%)
    - Extra Credit: Extra curricular section (+5%)

## Submission Guidelines
- Submit each part by its respective due date
- Include all HTML files and assets (images, media files)
- Provide a README.txt file with:
    - Your name and student ID
    - Part number being submitted
    - List of files included
    - Any special viewing instructions

## Technical Requirements
- Use HTML5 only (no CSS frameworks or JavaScript)
- Follow proper HTML semantics
- Ensure all images have alt text
- Maintain clean, well-commented code
- Validate HTML using W3C Validator

## Resources
- MDN Web Docs (https://developer.mozilla.org)
- W3C HTML Validator (https://validator.w3.org)
- HTML5 Doctor (http://html5doctor.com)

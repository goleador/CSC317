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

### 🚨 FINAL DEADLINE  🚨
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
    - Use heading elements (`<h1>-<h6>`) to structure your name and section titles.
    - Paragraphs (`<p>`) for your bio information (100-150 words)
    - Line breaks (`<br>`) where appropriate
3. Include:
    - Your name (as main heading)
    - School name
    - (OPTIONAL) Hometown
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
    <header>
       <h1>Your Name</h1>
       <img src="images/profile.jpeg" alt="Your Name's profile picture">
    </header>
    <nav>
        <ul>
           <li>link to section 1</li>
           <li>link to section 2</li>
           <li>link to section 3</li>
        </ul>      
    </nav>
    
    <main>
       <section id="section-1"></section>
       <section id="section-2"></section>
       <section id="section-3"></section>
    </main>
    
    <footer>
       <section id="contacts"></section>
    </footer>
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
    - (OPTIONAL)Tables for detailed job information 
3. (OPTIONAL) Use inline styles for:
    - Basic formatting, including text alignment
    - Background colors
    - and font sizes
4. Add proper id attributes to sections
5. (OPTIONAL) Include a basic contact form with:
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
<table>
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

```

---

## Part 4: Advanced Features and Final Polish
**Due: Final deadline above**

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
Your final grade will be based on the following four major components, assessing the overall quality of your submission.

1. Code Quality & Structure (30%)

- ✅ Proper use of HTML5 syntax and semantics (10%)
- ✅ Correct document structure (DOCTYPE, head, body, meta tags) (5%)
- ✅ Logical content organization (sections, headings, paragraphs) (10%)
- ✅ Clean, well-formatted, and commented code where needed (5%)

2. Content Completeness (30%)

- ✅ Bio section with a clear and concise 100-150 word introduction (5%)
- ✅ Education and experience sections with sub-headers, lists and or tables for clarity (5%)
- ✅ Projects section showcasing at least one meaningful project (5%)
- ✅ Navigation menu with working internal links (5%)
- ✅ At least ONE images (profile photo optional, school/hometown required) (5%)
- ✅ Proper use of multimedia elements (iframe, video, or audio) (5%)

3. Functionality & Usability (20%)

- ✅ All pages load correctly without broken elements (5%)
- ✅ Navigation works smoothly with accurate internal links (5%)
- ✅ Images display properly with meaningful alt attributes (5%)
- ✅ Contact form is correctly structured with required fields (5%)

4. Submission & Technical Requirements (20%)

- ✅ Correct repository structure (assignments/assignment-2/) (5%)
- ✅ All required files submitted (HTML, images, SUBMISSION.md) (5%)
- ✅ Version control usage (meaningful commit messages, proper Git usage) (5%)
- ✅ Valid HTML (passes W3C validation, no major syntax errors) (5%)

Extra Credit (+5%)

⭐ Extracurricular section showcasing additional work, hobbies, or involvement.

## Technical Requirements
- Use HTML5 only. CSS is not required, but you may use inline styles for basic text formatting.
- Follow proper HTML semantics
- Ensure all images have alt text
- Maintain clean, well-commented code where needed
- Validate HTML using W3C Validator

## Resources
- MDN Web Docs (https://developer.mozilla.org)
- W3C HTML Validator (https://validator.w3.org)
- HTML5 Doctor (http://html5doctor.com)

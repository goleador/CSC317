# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a course repository for **CSC 317: Introduction to Web Software Development** at San Francisco State University. It contains lecture materials, examples, assignments, and student work for teaching web development fundamentals.

## Repository Structure

- **`assignments/`** - Student assignment folders (1-4+), each containing README with instructions and student submissions
- **`lectures/`** - Lecture notes in markdown format covering HTML, CSS, JavaScript, HTTP, databases, and security
- **`examples/`** - Code examples and demonstrations:
  - `node-app/` - Basic Node.js HTTP server examples
  - `task-api/` - API example directory (currently empty placeholder)
  - Various standalone HTML files demonstrating CSS concepts (flexbox, grid, responsive design, etc.)
- **`archives/S25/`** - Archived assignments from Spring 2025 semester
- **`assets/`** - Images and media files used in course materials
- **`guides/`** - Additional documentation and guides
- **`quizzes/`** - Quiz materials and solutions
- **`demo/`** - Demonstration files
- **`index.html`** - Main course landing page

## Key Assignment Workflows

### Assignment 3 - Portfolio Styling (Group Assignment)
Students work in groups of 3-4 to create multiple CSS approaches for a portfolio website:
- Hand-written CSS (collaborative)
- AI-generated CSS using text prompts (one per member)
- Hybrid CSS combining best elements
- Includes CSS switcher for comparing approaches

**File Structure:**
```
assignments/3/
├── index.html (portfolio)
├── styles/ (styles.css, ai-1.css, ai-2.css, hybrid.css)
├── scripts/switcher.js
├── prompts/ (markdown files with AI prompts)
├── GROUP_INFO.md
└── SUBMISSION.md
```

### Assignment 4 - JavaScript Calculator
Three-part assignment building a calculator and integrating into portfolio:
- Part 0: Environment setup (Node.js, hello.js)
- Part 1: Build iOS-style calculator with vanilla JavaScript
- Part 2: Integrate calculator into portfolio from Assignment 3

**File Structure:**
```
assignments/4/
├── index.html (portfolio from Assignment 3)
├── calculator.html
├── styles/ (styles.css, calculator.css, plus Assignment 3 CSS)
├── scripts/ (hello.js, calculator.js)
├── images/
└── SUBMISSION.md
```

## Development Commands

### Node.js Examples
```bash
# Run the basic HTTP server example
cd examples/node-app
node index.js
# Server runs on PORT environment variable or 3000
```

### HTML Validation
Students must validate all HTML and CSS using:
- HTML: https://validator.w3.org/
- CSS: https://jigsaw.w3.org/css-validator/

### Git Workflow
Students are expected to:
- Commit frequently with descriptive messages
- Use branches and pull requests for group work
- Deploy via GitHub Pages (repository is public for Pages to work)

### GitHub Pages Deployment
Student work should be accessible at: `https://username.github.io/CSC317/`
- Assignments should be viewable at: `assignments/3/index.html`, `assignments/4/index.html`, etc.

## Course Technologies

- **Frontend:** HTML5, CSS3 (Flexbox, Grid, responsive design), vanilla JavaScript (ES6+)
- **Backend:** Node.js (http module), Express.js (introduced in later assignments)
- **Databases:** PostgreSQL or MongoDB (covered in later lectures)
- **Deployment:** Render.com (for backend), GitHub Pages (for frontend)
- **Tools:** Git/GitHub, VS Code (recommended), browser DevTools

## Important Notes

- **AI Tool Policy:** Students are encouraged to use AI tools responsibly for learning, but must document AI usage in prompts and not just copy-paste
- **Group Work:** Assignments 3+ involve group collaboration with specific role assignments
- **Validation Required:** All HTML/CSS must pass W3C validation before submission
- **No Frameworks:** Assignments use vanilla JavaScript, no libraries/frameworks allowed for core requirements
- **Responsive Design:** All student work must be responsive and work across mobile, tablet, and desktop

## Code Examples Overview

The `examples/` directory contains standalone HTML files demonstrating key concepts:
- **CSS Basics:** `css_basics.html`, `block_vs_inline.html`, `abs_vs_rel.html`, `em_vs_rem.html`
- **Layout:** `flexbox_basics.html`, `flex_vs_grid.html`, `grid_template_areas.html`, `grid_using_fr.html`
- **Responsive Design:** `responsive_layout_patterns.html`, `media_query_breakpoints.html`
- **Real-world Layouts:** `netflix.html`, `pinterest.html`, `spotify.html`
- **Forms & Accessibility:** `form.html`, `keyboard_navigation.html`, `screen_readers.html`

## Lecture Materials

Lectures are in markdown format and cover:
- HTML fundamentals and semantic web (html-lecture-*.md)
- CSS styling and responsive design (css-lecture-*.md)
- JavaScript fundamentals and DOM manipulation (js-lecture-*.md)
- HTTP and web architecture (http-lecture-*.md)
- Backend development with Node.js
- Databases (SQL and MongoDB)
- Security and authentication

## When Working with Student Assignments

1. **Validate Structure:** Ensure assignments follow the exact directory structure specified in assignment READMEs
2. **Check Validation:** Remind students to validate HTML/CSS if errors are present
3. **Responsive Testing:** Check mobile, tablet, and desktop layouts
4. **Browser DevTools:** Encourage use of console for debugging JavaScript
5. **Group Work:** For Assignment 3+, verify all group members have contributed via Git history
6. **Documentation:** Ensure SUBMISSION.md is complete with all required sections

# HTML Lecture 2: Building Your First Portfolio Page

---

## Review: The 20 Essential Tags

Let's quickly review what we learned last week:

**Structure:** `<html>`, `<head>`, `<title>`, `<body>`  
**Text:** `<h1>`-`<h6>`, `<p>`, `<br>`, `<hr>`  
**Links & Media:** `<a>`, `<img>`, `<video>`, `<audio>`  
**Lists:** `<ul>`, `<ol>`, `<li>`  
**Tables:** `<table>`, `<tr>`, `<td>`, `<th>`  
**Forms:** `<form>`, `<input>`, `<button>`  
**Semantic Layout:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`

---

## Thinking in "HTML Blocks"

* Web pages are built from **blocks** of content
* Each block has a **purpose** and **meaning**
* Use semantic tags to describe what each block contains
* Think **structure first**, styling comes later

### Common Website Blocks:
* Header with navigation
* Main content area
* Sidebar (optional)
* Footer with contact info

---

## Planning Your Portfolio Page

Before writing code, think about:

1. **What information do you want to share?**
   - Your name and title
   - About section
   - Skills or projects
   - Contact information

2. **How should it be organized?**
   - Header with your name
   - Navigation menu
   - Main content sections
   - Footer with links

---

## Exercise 1: Portfolio Page Challenge

**Your Mission:** Build a student portfolio page that includes:

✅ A header with your name and navigation  
✅ An "About Me" section  
✅ A "Skills" section with a list  
✅ A "Contact" section  
✅ A footer  

**Tags you'll need:**
`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`, `<h2>`, `<p>`, `<ul>`, `<li>`, `<a>`

---

## Step-by-Step Approach

1. **Start with structure**
   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <title>Your Name - Portfolio</title>
     </head>
     <body>
       <!-- Your content goes here -->
     </body>
   </html>
   ```

2. **Add semantic sections**
   - Header
   - Main content area
   - Footer

3. **Fill in the content**
   - Headings
   - Paragraphs
   - Lists
   - Links

---

## Best Practices

* **Use semantic tags** → `<section>` not `<div>`
* **Meaningful headings** → `<h1>` for main title, `<h2>` for sections
* **Descriptive link text** → "View my projects" not "click here"
* **Alt text for images** → Always describe what the image shows
* **Proper nesting** → Close tags in reverse order

---

## Common Mistakes to Avoid

❌ **Skipping the DOCTYPE**  
❌ **Forgetting to close tags**  
❌ **Using `<br>` instead of `<p>` for spacing**  
❌ **Missing alt attributes on images**  
❌ **Using `<h1>` multiple times** (use `<h2>`, `<h3>`, etc.)

---

## Looking at the Example

I'll show you `html-lecture-2-example-1.html` which demonstrates:

* Proper HTML structure
* Semantic layout tags
* Navigation menu
* Content sections
* Lists and links

**Your task:** Recreate this page structure with your own content!

---

## Homework Challenge

After completing the basic portfolio:

1. **Add an image** of yourself using `<img>`
2. **Create a table** showing your class schedule
3. **Add more sections** like "Hobbies" or "Goals"
4. **Include links** to your social media or email

---

## Next Week Preview

**HTML Lecture 3: Forms and Interactivity**

* Building contact forms
* Different input types
* Making your page interactive
* Preparing for CSS styling

---

## Resources

* [MDN HTML Reference](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
* [HTML Validator](https://validator.w3.org/)

Remember: **Practice makes perfect!** Try building different layouts and experiment with the tags you've learned.

---
